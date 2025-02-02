"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp, Heart, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./Profile";
import { MessageCircle, MessageSquare } from "lucide-react";

const topMenuItems = [
  { icon: "/menuIcons/home.png", label: "Home", href: "/homepage" },
  { icon: "/menuIcons/skills.png", label: "Skills", href: "/skills" },
  {
    icon: "/menuIcons/activities.png",
    label: "Activities",
    href: "/activities",
  },
  { icon: "/menuIcons/courses.png", label: "Courses", href: "/courses" },
  { icon: "/menuIcons/lecturers.png", label: "Lecturers", href: "/lecturers" },
  // { icon: "/menuIcons/questionnaire.png", label: "Surveys", href: "/surveys" }, // Future feature
];

const bottomMenuItems = [
  { Icon: MessageCircle, label: "Forum", href: "/forum" }, // Store component in 'Icon'
  { Icon: Heart, label: "Favorites", href: "/favorites" },
  { Icon: CircleHelp, label: "Help", href: "/help" },
  { Icon: Info, label: "About", href: "/about" },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="mt-4 flex h-[87dvh] flex-col text-sm">
        {/* Menu items */}
        <div className="flex-1">
          {topMenuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Tooltip key={item.label} delayDuration={50}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={
                      `group relative flex justify-center gap-4 py-3 pl-1 text-gray-500 transition hover:brightness-0 dark:text-gray-300 dark:hover:brightness-200 lg:justify-start lg:pl-3` +
                      (isActive ? " brightness-0 dark:brightness-200" : "")
                    }
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={25}
                      height={25}
                      className="dark:brightness-200"
                    />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  <span>{item.label}</span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="absolute bottom-20">
          {bottomMenuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const IconComponent = item.Icon; // Get the component from item.Icon
            return (
              <Tooltip key={item.label} delayDuration={50}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={
                      `group relative flex justify-center gap-4 py-3 pl-1 text-gray-500 transition hover:brightness-0 dark:text-gray-300 dark:hover:brightness-200 lg:justify-start lg:pl-3` +
                      (isActive ? " brightness-0 dark:brightness-200" : "")
                    }
                  >
                    {/* Render the IconComponent with size prop */}
                    <IconComponent size={30} />
                    <span className="mt-1 hidden lg:block">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  <span>{item.label}</span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <Profile />
    </TooltipProvider>
  );
};

export default Menu;
