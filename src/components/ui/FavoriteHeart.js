"use client";
import { Heart, HeartOff, Star, StarOff } from "lucide-react"; // Import filled and hollow star icons
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Import array update operations
import { getDoc } from "firebase/firestore";

const FavoriteHeart = ({ activityId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!userId) return; // Don't fetch if no user logged in

      const activityDocRef = doc(db, "activities", activityId);
      const docSnap = await getDoc(activityDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const favoritedBy = data.favoritedBy || []; // Get favoritedBy array or default to empty array
        setIsFavorited(favoritedBy.includes(userId)); // Check if current user's ID is in the array
      }
    };

    fetchFavoriteStatus();
  }, [activityId, userId]);

  const handleFavorite = async (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up to parent elements
    if (!userId) {
      alert("You must be logged in to favorite activities."); // Handle unauthenticated state
      return;
    }

    const activityDocRef = doc(db, "activities", activityId);

    try {
      await updateDoc(activityDocRef, {
        favoritedBy: arrayUnion(userId), // Use arrayUnion to add user ID to array
      });
      setIsFavorited(true); // Optimistic update
    } catch (error) {
      console.error("Error favoriting activity:", error);
      setIsFavorited(false); // Revert on error
      alert("Failed to favorite activity. Please try again.");
    }
  };

  const handleUnfavorite = async (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up to parent elements
    if (!userId) {
      return;
    }
    const activityDocRef = doc(db, "activities", activityId);

    try {
      await updateDoc(activityDocRef, {
        favoritedBy: arrayRemove(userId), // Use arrayRemove to remove user ID from array
      });
      setIsFavorited(false); // Optimistic update
    } catch (error) {
      console.error("Error unfavoriting activity:", error);
      setIsFavorited(true); // Revert on error
      alert("Failed to unfavorite activity. Please try again.");
    }
  };

  return (
    <button
      onClick={isFavorited ? handleUnfavorite : handleFavorite}
      className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
      aria-label={isFavorited ? "Unfavorite Activity" : "Favorite Activity"}
    >
      {isFavorited ? (
        <Heart className="h-4 w-4 fill-red-400 text-red-400" /> // Filled heart if favorited
      ) : (
        <HeartOff className="h-4 w-4 text-gray-500 dark:text-gray-300" /> // Hollow heart if not
      )}
    </button>
  );
};

export default FavoriteHeart;
