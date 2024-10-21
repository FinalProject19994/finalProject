import Image from "next/image";
import Link from "next/link";

const ProfileMenu = ({ closeMenu }) => {
  return (
    <div className="absolute right-4 top-16 z-50 rounded-lg bg-white px-4 py-6 text-gray-600 shadow-md">
      <div className="flex flex-col gap-4">
        <Link href={"/settings"} className="flex hover:brightness-0">
          <Image
            src="/menuIcons/profile.png"
            alt="profile"
            width={25}
            height={20}
          />
          <button className="px-2 hover:text-black" onClick={closeMenu}>
            Profile settings
          </button>
        </Link>
        <Link
          href={"/help"}
          className="flex hover:brightness-0"
          onClick={closeMenu}
        >
          <Image
            src="/menuIcons/help.png"
            alt="help"
            width={25}
            height={20}
            className="cursor-pointer"
          />
          <button className="px-2 hover:text-black">Help</button>
        </Link>
        <Link
          href={"/about"}
          className="flex hover:brightness-0"
          onClick={closeMenu}
        >
          <Image
            src="/menuIcons/info.png"
            alt="info"
            width={25}
            height={20}
            className="cursor-pointer"
          />
          <button className="px-2 hover:text-black">About</button>
        </Link>
        <div className="flex hover:brightness-0">
          <Image
            src="/menuIcons/logout.png"
            alt="logout"
            width={25}
            height={20}
          />
          <button className="px-2 hover:text-black" onClick={closeMenu}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
