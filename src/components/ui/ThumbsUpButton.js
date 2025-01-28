"use client";
import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover components

const ThumbsUpButton = ({ activityId }) => {
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [hasThumbedUp, setHasThumbedUp] = useState(false);
  const [isLikersPopoverOpen, setIsLikersPopoverOpen] = useState(false); // State for popover visibility
  const [likers, setLikers] = useState([]); // State to store likers list
  const userId = auth.currentUser?.uid;

  const fetchLikers = async () => {
    const likersList = [];
    const thumbsUpUsersCollection = collection(
      db,
      `activities/${activityId}/thumbsUpUsers`,
    );
    const thumbsUpUsersSnapshot = await getDocs(thumbsUpUsersCollection);

    for (const docSnap of thumbsUpUsersSnapshot.docs) {
      const likerUserId = docSnap.id; // Document ID is the user UID
      const userDocSnap = await getDoc(doc(db, "users", likerUserId)); // Fetch user doc for each liker
      if (userDocSnap.exists()) {
        likersList.push(userDocSnap.data()); // Add user data to likers list
      }
    }
    setLikers(likersList);
  };

  useEffect(() => {
    const fetchThumbsUpData = async () => {
      const activityDocRef = doc(db, "activities", activityId);
      const userThumbsUpDocRef = doc(activityDocRef, "thumbsUpUsers", userId);

      const docSnap = await getDoc(activityDocRef);
      if (docSnap.exists()) {
        setThumbsUpCount(docSnap.data().thumbsUpCount || 0);
      }

      if (userId) {
        const userThumbsUpSnap = await getDoc(userThumbsUpDocRef);
        setHasThumbedUp(userThumbsUpSnap.exists());
      } else {
        setHasThumbedUp(false);
      }
      fetchLikers(); // Fetch likers list when component loads
    };

    fetchThumbsUpData();
  }, [activityId, userId]);

  const handleThumbsUp = async (event) => {
    event.stopPropagation();
    if (!userId) {
      alert("You must be logged in to thumb up activities.");
      return;
    }

    const activityDocRef = doc(db, "activities", activityId);
    const userThumbsUpDocRef = doc(activityDocRef, "thumbsUpUsers", userId); // Reference to user-specific thumbs up doc

    try {
      await updateDoc(activityDocRef, {
        thumbsUpCount: increment(1), // Increment total thumbs up count
      });
      await setDoc(userThumbsUpDocRef, { thumbedUp: true }); // Create user-specific thumbs up doc
      setThumbsUpCount((prevCount) => prevCount + 1);
      setHasThumbedUp(true);
    } catch (error) {
      console.error("Error thumbing up activity:", error);
      // Revert optimistic update on error (optional)
      setThumbsUpCount((prevCount) => prevCount - 1);
      setHasThumbedUp(false);
      alert("Failed to thumb up activity. Please try again.");
    }
  };

  const handleRemoveThumbsUp = async (event) => {
    event.stopPropagation();
    if (!userId) {
      return;
    }

    const activityDocRef = doc(db, "activities", activityId);
    const userThumbsUpDocRef = doc(activityDocRef, "thumbsUpUsers", userId);

    try {
      await deleteDoc(userThumbsUpDocRef); // Attempt to delete user-specific doc

      await updateDoc(activityDocRef, {
        thumbsUpCount: increment(-1), // Decrement total count
      });

      setThumbsUpCount((prevCount) => Math.max(0, prevCount - 1));
      setHasThumbedUp(false);
    } catch (error) {
      console.error("handleRemoveThumbsUp - Error removing thumb up:", error); // Log error details
      // Revert optimistic update on error (optional)
      setThumbsUpCount((prevCount) => prevCount + 1);
      setHasThumbedUp(true);
      alert("Failed to remove thumb up. Please try again.");
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={hasThumbedUp ? handleRemoveThumbsUp : handleThumbsUp}
        className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
        aria-label={hasThumbedUp ? "Already Thumbed Up" : "Thumb Up"}
      >
        {hasThumbedUp ? (
          <ThumbsUp className="h-4 w-4 fill-primary_purple text-primary_purple" />
        ) : (
          <ThumbsUp className="h-4 w-4 text-gray-500 dark:text-gray-300" />
        )}
      </button>
      <Popover open={isLikersPopoverOpen} onOpenChange={setIsLikersPopoverOpen}>
        <PopoverTrigger asChild>
          <span
            onClick={(event) => {
              event.stopPropagation();
              setIsLikersPopoverOpen(!isLikersPopoverOpen);
            }} // Toggle popover on count click
            className="cursor-pointer text-sm text-gray-500 hover:underline dark:text-gray-300"
          >
            {thumbsUpCount}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80 overflow-auto p-4 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
          <h4 className="mb-2 font-semibold dark:text-gray-100">
            Lecturers who liked this activity:
          </h4>
          <ul className="list-none space-y-1 pl-0">
            {likers.length > 0 ? (
              likers.map((liker) => (
                <li key={liker.id} className="flex items-center space-x-2">
                  <span>{liker.name}</span>
                </li>
              ))
            ) : (
              <li>No likes yet.</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThumbsUpButton;
