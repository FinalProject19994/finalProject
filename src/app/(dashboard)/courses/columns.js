"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

const ActionCell = ({ row, onCourseDelete, onCourseEdit }) => {
  const courseId = row.original.id;
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
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
  }, []);

  const isAuthorizedToDelete = userRole === "admin";

  const handleDelete = async () => {
    try {
      await onCourseDelete(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onCourseEdit(row.original)}>
            Edit Course
          </DropdownMenuItem>
          {isAuthorizedToDelete && (
            <DropdownMenuItem onClick={handleDelete}>
              Delete Course
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Modal for editing */}
      {isModalOpen && (
        <Modal
          table="course"
          type="edit"
          data={row.original}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export const columns = ({ onCourseDelete, onCourseEdit }) => {
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
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
          </Button>
        );
      },
    },
    {
      accessorKey: "semester",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Semester
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
      cell: ({ getValue }) => getValue()?.join(", ") || "N/A",
    },
    {
      accessorKey: "departments",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Departments
          </Button>
        );
      },
      cell: ({ getValue }) => getValue()?.join(", ") || "N/A",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionCell
          row={row}
          onCourseDelete={onCourseDelete}
          onCourseEdit={onCourseEdit}
        />
      ),
    },
  ];
};
