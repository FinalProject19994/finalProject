"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns = [
  {
    id: "questionnaireID",
    header: "Code",
    accessorKey: "questionnaireID",
  },
  {
    id: "course",
    header: "Course",
    accessorKey: "course",
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
  },
  {
    id: "composer",
    header: "Composer",
    accessorKey: "composer",
  },
  {
    id: "skills",
    header: "Skills",
    accessorKey: "skills",
  },
  {
    id: "creationDate",
    header: "Creation Date",
    accessorKey: "creationDate",
  },
  {
    id: "actions",
    header: "",
    accessor: "Edit",
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
            <DropdownMenuItem>View Activities</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
