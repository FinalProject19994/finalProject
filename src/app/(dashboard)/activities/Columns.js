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

import FavoriteHeart from "@/components/ui/FavoriteHeart";
import ThumbsUpButton from "@/components/ui/ThumbsUpButton"; // <-- Verify this import

const ActionCell = ({
  row,
  onActivityDelete,
  onActivityEdit,
  onActivityDuplicate,
}) => {
  const activityId = row.original.id;
  // Ensure lecturers array exists and is not null before mapping
  const activityLecturerIds = Array.isArray(row.original.lecturers)
    ? row.original.lecturers.map((lecturer) => lecturer.id)
    : [];
  const currentUserId = auth.currentUser?.uid;

  const [userRole, setUserRole] = useState(null);
  const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false); // State for edit authorization

  useEffect(() => {
    const fetchUserRoleAndCheckAuthorization = async () => {
      if (currentUserId) {
        try {
          const userDocRef = doc(db, "users", currentUserId);
          const userDoc = await getDoc(userDocRef);
          let role = null;
          if (userDoc.exists()) {
            role = userDoc.data().role.toLowerCase();
            setUserRole(role);
          }

          // Authorization checks
          const editAuth =
            role === "admin" || activityLecturerIds.includes(currentUserId);
          setIsAuthorizedToEdit(editAuth);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        // If no currentUserId, user is not authorized
        setIsAuthorizedToEdit(false);
      }
    };

    fetchUserRoleAndCheckAuthorization();
  }, [currentUserId, activityLecturerIds]);

  const handleDelete = async () => {
    try {
      await onActivityDelete(activityId);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return isAuthorizedToEdit ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onActivityEdit(row.original)}
          className="cursor-pointer"
        >
          Edit Activity
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onActivityDuplicate(row.original)}
          className="cursor-pointer"
        >
          Duplicate Activity
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
          Delete Activity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onActivityDuplicate(row.original)}
          className="cursor-pointer"
        >
          Duplicate Activity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns = ({
  onActivityDelete,
  onActivityEdit,
  onActivityDuplicate,
}) => {
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
      cell: ({ row }) =>
        row.original.lecturers?.map((lecturer) => lecturer.name).join(", ") ||
        "N/A",
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
      cell: ({ row }) =>
        row.original.skills?.map((skill) => skill.name).join(", ") || "N/A",
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
      cell: ({ row }) => row.original.course?.title || "Unknown Course",
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
      accessorKey: "thumbsUp",
      header: "Likes",
      cell: ({ row }) => <ThumbsUpButton activityId={row.original.id} />,
    },
    {
      accessorKey: "favorite",
      header: "Favorite",
      cell: ({ row }) => <FavoriteHeart activityId={row.original.id} />,
    },
    {
      accessorKey: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ActionCell
          row={row}
          onActivityDelete={onActivityDelete}
          onActivityEdit={onActivityEdit}
          onActivityDuplicate={onActivityDuplicate}
        />
      ),
    },
  ];
};
