"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export const columns = [
  // TODO: Fix the avatars
  // {
  //   accessorKey: "avatar",
  //   header: "",
  //   cell: () => {
  //     const avatar = `/avatars/${Math.floor(Math.random() * 10 + 1)}.png`;
  //     return <Image src={avatar} alt="avatar" width={40} height={40} />;
  //   },
  // },
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Image
                src="/menuIcons/activities.png"
                alt="icon"
                width={25}
                height={25}
              />
              View Activities
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Image
                src="/menuIcons/courses.png"
                alt="icon"
                width={25}
                height={25}
              />
              View Courses
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
