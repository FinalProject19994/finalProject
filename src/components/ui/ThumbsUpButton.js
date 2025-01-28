"use client";
import { auth, db } from "@/lib/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore"; // Import setDoc and deleteDoc
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

const ThumbsUpButton = ({ activityId }) => {
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [hasThumbedUp, setHasThumbedUp] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchThumbsUpData = async () => {
      const activityDocRef = doc(db, "activities", activityId);
      const userThumbsUpDocRef = doc(activityDocRef, "thumbsUpUsers", userId); // Reference to user-specific thumbs up doc

      const docSnap = await getDoc(activityDocRef);
      if (docSnap.exists()) {
        setThumbsUpCount(docSnap.data().thumbsUpCount || 0);
      }

      if (userId) {
        // Only fetch user-specific status if logged in
        const userThumbsUpSnap = await getDoc(userThumbsUpDocRef);
        setHasThumbedUp(userThumbsUpSnap.exists()); // Check if user-specific thumbs up doc exists
      } else {
        setHasThumbedUp(false); // Default to not thumbed up if no user
      }
    };

    fetchThumbsUpData();
  }, [activityId, userId]);

  const handleThumbsUp = async () => {
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

  const handleRemoveThumbsUp = async () => {
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
      <span className="text-sm text-gray-500 dark:text-gray-300">
        {thumbsUpCount}
      </span>
    </div>
  );
};

export default ThumbsUpButton;
