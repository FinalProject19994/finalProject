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
import { useRouter } from "next/navigation";

const ActionCell = ({ row, onCourseDelete, onCourseEdit }) => {
  const router = useRouter();
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

  const handleNavigation = () => {
    const encodedCourseId = encodeURIComponent(row.original.title);
    router.push(`/activities/?search=${encodedCourseId}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleNavigation()}
            className="cursor-pointer"
          >
            View Activities
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onCourseEdit(row.original)}
            className="cursor-pointer"
          >
            Edit Course
          </DropdownMenuItem>
          {isAuthorizedToDelete && (
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
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
      cell: ({ row }) => row.original.id.split("-")[0],
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
      cell: ({ getValue }) => {
        const lecturers = getValue();
        // Check if the value is an array and not empty
        if (Array.isArray(lecturers) && lecturers.length > 0) {
          return lecturers.map((lecturer) => lecturer.name).join(", ");
        } else {
          return "N/A";
        }
      },
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
      cell: ({ row }) => {
        const departments = row.original.departments;
        return (
          <div>
            {Array.isArray(departments)
              ? departments.join(", ")
              : "Unknown Department"}
          </div>
        );
      },
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
