"use client";
import Image from "next/image";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeProfileMenu = () => {
    setIsOpen(false);
  };

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
          <span className="text-black">Joy Simha Oz</span>
          <span className="text-right text-xs leading-3">Admin</span>
        </div>
        <Image
          src="/avatars/dog.png"
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
