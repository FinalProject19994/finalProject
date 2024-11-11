"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db } from "@/lib/firebase"; // Import Firestore database reference
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  // Fetch user data from Firestore after authentication
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, "users", user.uid); // Get the document by user UID
        const docSnap = await getDoc(userDocRef); // Get the document snapshot

        if (docSnap.exists()) {
          setUserData(docSnap.data()); // Set the user data from Firestore
        } else {
          console.error("No such document!");
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleProfileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeProfileMenu = () => {
    setIsOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if user is logged in and display appropriate name
  const userName =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : "Unknown User";
  const role = userData?.role || "Unknown Role";

  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden items-center gap-2 rounded-full border border-gray-500 bg-white p-2 text-xs text-gray-500 md:flex">
        <Image
          src="/menuIcons/search.png"
          alt="search"
          width={14}
          height={14}
        />
        <input
          type="text"
          placeholder="Search..."
          className="hidden outline-none md:flex"
        />
      </div>

      {/* Avatar and user */}
      <div className="ml-auto flex items-center gap-4">
        <div className="flex flex-col text-gray-500">
          {/* Display the user's name */}
          <span className="text-black">{userName}</span>
          <span className="text-right text-xs leading-3">{role}</span>
        </div>
        <Image
          // TODO: Add random avatars
          src={user?.photoURL || "/avatars/dog.png"} // Use user's profile photo if available
          width={40}
          height={40}
          alt="profile picture"
          className="cursor-pointer rounded-full hover:brightness-90"
          onClick={handleProfileMenu}
        />
      </div>

      {isOpen && <ProfileMenu closeMenu={closeProfileMenu} />}
    </div>
  );
};

export default Navbar;
