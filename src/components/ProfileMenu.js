import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

const ProfileMenu = ({ closeMenu }) => {
  const router = useRouter();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div className="profile-menu absolute bottom-16 z-50 w-full rounded-lg px-4 py-6 text-gray-600">
      <div className="flex flex-col gap-4">
        <Link
          href={"/settings"}
          className="flex hover:brightness-0"
          onClick={closeMenu}
        >
          <Image
            src="/menuIcons/profile.png"
            alt="profile"
            width={25}
            height={20}
          />
          <button className="px-2 hover:text-black">Profile settings</button>
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
            onClick={handleLogout}
            src="/menuIcons/logout.png"
            alt="logout"
            width={25}
            height={20}
            className="cursor-pointer"
          />
          <button className="px-2 hover:text-black" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
