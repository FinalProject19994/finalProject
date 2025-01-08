import { getAuth, signOut } from "firebase/auth";
import { CircleHelp, CircleUserRound, Info, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThemeToggle from "./theme/ThemeToggle";

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
    <div className="profile-menu absolute bottom-16 z-50 mx-2 my-4 rounded-md bg-gray-200 px-2 py-4 text-gray-600 shadow-md dark:bg-gray-600 dark:text-gray-300 lg:bg-transparent lg:shadow-none dark:lg:bg-transparent">
      <div className="flex flex-col gap-4">
        <ThemeToggle />
        <Link
          href={"/settings"}
          className="flex hover:text-black dark:hover:text-white"
          onClick={closeMenu}
        >
          <CircleUserRound size={30} />
          <button className="px-2">Profile</button>
        </Link>
        <Link
          href={"/help"}
          className="flex hover:text-black dark:hover:text-white"
          onClick={closeMenu}
        >
          <CircleHelp size={30} />
          <button className="px-2">Help</button>
        </Link>
        <Link
          href={"/about"}
          className="flex hover:text-black dark:hover:text-white"
          onClick={closeMenu}
        >
          <Info size={30} />
          <button className="px-2">About</button>
        </Link>
        <div className="flex hover:text-black dark:hover:text-white">
          <LogOut size={30} onClick={handleLogout} />
          <button className="px-2" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
