"use client";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { icon: "/menuIcons/home.png", label: "Home", href: "/admin" },
  { icon: "/menuIcons/courses.png", label: "Courses", href: "/" },
  { icon: "/menuIcons/activities.png", label: "Activities", href: "/" },
  { icon: "/menuIcons/skills.png", label: "Skills", href: "/" },
  {
    icon: "/menuIcons/lecturers.png",
    label: "Lecturers",
    href: "/list/lecturers",
  },
  {
    icon: "/menuIcons/questionnaire.png",
    label: "Questionnaires",
    href: "/",
  },
];

const profileMenuItems = [
  { icon: "/menuIcons/profile.png", label: "Profile", href: "/" },
  { icon: "/menuIcons/settings.png", label: "Settings", href: "/" },
  { icon: "/menuIcons/logout.png", label: "Logout", href: "/" },
];

const Menu = () => {
  return (
    <div className="mt-4 flex h-[87dvh] flex-col">
      {/* Menu items */}
      <div className="flex-1">
        {menuItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex justify-center gap-4 py-3 pl-1 text-gray-500 transition hover:brightness-0 lg:justify-start lg:pl-3"
          >
            <Image src={item.icon} alt="icon" width={25} height={25} />
            <span className="hidden lg:block">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Profile menu items */}
      {/* TODO: center the buttons in small screens */}
      <div className="absolute bottom-2">
        {profileMenuItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex justify-center gap-4 py-3 pl-1 text-gray-500 transition hover:brightness-0 lg:justify-start lg:pl-3"
          >
            <Image src={item.icon} alt="icon" width={25} height={25} />
            <span className="hidden lg:block">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
