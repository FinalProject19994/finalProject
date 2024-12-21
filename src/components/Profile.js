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
    <div className="flex items-center justify-between p-2">
      {/* Avatar and user */}
      <div className="flex items-center gap-4">
        <Image
          // TODO: Add random avatars
          src={user?.photoURL || "/avatars/dog.png"} // Use user's profile photo if available
          width={40}
          height={40}
          alt="profile picture"
          className="cursor-pointer rounded-full hover:brightness-90"
          onClick={handleProfileMenu}
        />
        <div className="flex flex-col text-gray-500">
          {/* Display the user's name */}
          <span className="hidden text-black lg:block">{userData?.name}</span>
          <span className="hidden text-xs leading-3 lg:block">
            {userData?.role}
          </span>
        </div>
      </div>

      {isOpen && <ProfileMenu closeMenu={closeProfileMenu} />}
    </div>
  );
};

export default Profile;
