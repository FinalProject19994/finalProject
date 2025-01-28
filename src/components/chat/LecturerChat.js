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
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  // Scroll to bottom whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim()) {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to send messages.");
        return;
      }

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
        className="mb-1 flex-1 space-y-2 overflow-y-auto"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "w-fit max-w-[80%] rounded-lg p-2 shadow-md",
              message.senderId === auth.currentUser?.uid
                ? "ml-auto mr-2 bg-primary_purple text-right text-white"
                : "mr-auto bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
            )}
          >
            <div className="text-sm font-semibold">{message.senderName}</div>
            <div className="break-words text-sm">{message.messageText}</div>
            <div className="mt-1 text-xs text-gray-400 dark:text-gray-300">
              {message.timestamp?.toDate().toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="border-t p-4 dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-500 bg-gray-500 p-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary_purple dark:border-gray-700 dark:text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-primary_purple px-4 py-2 font-semibold text-white hover:bg-purple-700 dark:text-gray-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default LecturerChat;
