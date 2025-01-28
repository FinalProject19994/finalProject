"use client";
import { auth, db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const LecturerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data for chat:", error);
        }
      }
    };

    fetchUserData();

    const messagesCollection = collection(db, "lecturerChats");
    const q = query(
      messagesCollection,
      orderBy("timestamp", "asc"),
      limit(500),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedMessages = [];

      if (snapshot.empty) {
        console.log("Initial snapshot is empty, no messages to load.");
      } else {
        if (messages.length === 0) {
          fetchedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(
            "Initial messages loaded from snapshot:",
            fetchedMessages.length,
          );
        } else {
          // Real-time updates - Process only docChanges for new messages
          fetchedMessages = snapshot
            .docChanges()
            .map((change) => {
              if (change.type === "added") {
                return { id: change.doc.id, ...change.doc.data() };
              } else {
                return null;
              }
            })
            .filter(Boolean);
          console.log("Real-time messages updates:", fetchedMessages.length);
        }
        setMessages((prevMessages) => {
          return messages.length === 0
            ? fetchedMessages
            : [...prevMessages, ...fetchedMessages];
        });
      }

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim()) {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to send messages.");
        return;
      }
      console.log(userData);

      try {
        const messagesCollection = collection(db, "lecturerChats");
        await addDoc(messagesCollection, {
          senderId: user.uid,
          senderName: userData?.name,
          messageText: newMessage,
          timestamp: serverTimestamp(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-2 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "w-max rounded-lg p-2",
              message.senderId === auth.currentUser?.uid
                ? "bg-primary_purple-table-light ml-auto bg-primary_purple text-right text-white" // Right align for current user
                : "mr-auto bg-gray-100 text-left text-gray-700 dark:bg-gray-700 dark:text-gray-300", // Left align for others
            )}
          >
            <div className="text-sm font-semibold">{message.senderName}</div>
            <div className="text-sm">{message.messageText}</div>
            <div className="text-xs text-gray-400 dark:text-gray-300">
              {message.timestamp?.toDate().toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="border-t p-4 dark:border-gray-700"
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-md border p-2 text-sm text-gray-700 outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110 dark:text-gray-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default LecturerChat;
