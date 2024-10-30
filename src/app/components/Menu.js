"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: "/menuIcons/home.png", label: "Home", href: "/homepage" },
  { icon: "/menuIcons/courses.png", label: "Courses", href: "/courses" },
  {
    icon: "/menuIcons/activities.png",
    label: "Activities",
    href: "/activities",
  },
  { icon: "/menuIcons/skills.png", label: "Skills", href: "/skills" },
  {
    icon: "/menuIcons/lecturers.png",
    label: "Lecturers",
    href: "/lecturers",
  },
  {
    icon: "/menuIcons/questionnaire.png",
    label: "Surveys",
    href: "/surveys",
  },
];

const Menu = () => {
  return (
    <TooltipProvider>
      <div className="mt-4 flex h-[87dvh] flex-col text-sm">
        {/* Menu items */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <Tooltip key={item.label} delayDuration={50}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="group relative flex justify-center gap-4 py-3 pl-1 text-gray-500 transition hover:brightness-0 lg:justify-start lg:pl-3"
                >
                  <Image src={item.icon} alt="icon" width={25} height={25} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
                <span>{item.label}</span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Menu;
