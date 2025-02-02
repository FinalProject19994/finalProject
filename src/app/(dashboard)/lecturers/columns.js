"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionCell = ({ row }) => {
  const router = useRouter();
  const rowName = row.original.name;

  const handleNavigation = (path) => {
    const encodedPath = encodeURIComponent(rowName);
    router.push(`${path}?search=${encodedPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleNavigation("/activities")}
          className="cursor-pointer"
        >
          View Activities
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigation("/courses")}
          className="cursor-pointer"
        >
          View Courses
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  // {
  //   accessorKey: "departments",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Departments
  //       </Button>
  //     );
  //   },
  // },
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
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
