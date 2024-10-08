import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/menuIcons/home.png", label: "Home", href: "/" },
      { icon: "/menuIcons/activities.png", label: "Activities", href: "/" },
      { icon: "/menuIcons/skills.png", label: "Skills", href: "/" },
      {
        icon: "/menuIcons/questionnaire.png",
        label: "Questionnaires",
        href: "/",
      },
    ],
  },
  // TODO: move the other items to the profile menu
  {
    title: "OTHER",
    items: [
      { icon: "/menuIcons/profile.png", label: "Profile", href: "/" },
      { icon: "/menuIcons/settings.png", label: "Settings", href: "/" },
      { icon: "/menuIcons/logout.png", label: "Logout", href: "/" },
    ],
  },
];

// TODO: Center the div horizontally
// TODO: move the menu items left a right bit
const Menu = () => {
  return (
    <div className="mt-4">
      {menuItems.map((item) => (
        <div key={item.title}>
          <span className="hidden pb-3 pl-2 pt-6 font-light text-gray-400 lg:block">
            {item.title}
          </span>
          {item.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center gap-4 rounded-lg py-3 pl-2 text-gray-500 transition hover:bg-sky-100 lg:justify-start"
            >
              <Image src={item.icon} alt="icon" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
