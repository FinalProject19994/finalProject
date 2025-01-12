"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

const ActionCell = ({ row, onActivityDelete }) => {
  const activityId = row.original.id;
  const activityLecturerIds = row.original.lecturers.map(
    (lecturer) => lecturer.id,
  );
  const currentUserId = auth.currentUser?.uid;

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUserId) {
        try {
          const userDocRef = doc(db, "users", currentUserId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role.toLowerCase());
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [currentUserId]);

  const isAuthorizedToDelete =
    userRole === "admin" || activityLecturerIds.includes(currentUserId);

  const handleDelete = async () => {
    try {
      await onActivityDelete(activityId);
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>Edit Activity</DropdownMenuItem>
        {/* Check for admin or if current user is a lecturer of the activity */}
        {isAuthorizedToDelete && (
          <DropdownMenuItem onClick={handleDelete}>
            Delete Activity
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns = ({ onActivityDelete }) => {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
          </Button>
        );
      },
    },
    {
      accessorKey: "lecturers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lecturers
          </Button>
        );
      },
      cell: ({ getValue }) => getValue().join(", "),
    },
    {
      accessorKey: "skills",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Skills
          </Button>
        );
      },
      cell: ({ getValue }) => getValue().join(", "),
    },
    {
      accessorKey: "course",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course
          </Button>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
          </Button>
        );
      },
    },
    {
      accessorKey: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ActionCell row={row} onActivityDelete={onActivityDelete} />
      ),
    },
  ];
};
