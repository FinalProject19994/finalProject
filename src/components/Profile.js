"use client";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  // Fetch user data from Firestore after authentication
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
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

  return (
    <button
      onClick={handleProfileMenu}
      className="absolute bottom-6 flex items-center gap-4 rounded-md px-2"
    >
      {/* Avatar and user */}
      <Image
        // TODO: Add random avatars
        src={user?.photoURL || "/avatars/dog.png"}
        width={40}
        height={40}
        alt="profile picture"
        className="cursor-pointer rounded-full hover:brightness-90"
      />
      <div className="flex flex-col text-gray-500 dark:text-gray-300">
        {/* Display the user's name */}
        <span className="hidden lg:block">{userData?.name}</span>
        <span className="hidden text-start text-xs lg:block">
          {userData?.role}
        </span>
      </div>

      {isOpen && <ProfileMenu closeMenu={closeProfileMenu} />}
    </button>
  );
};

export default Profile;
