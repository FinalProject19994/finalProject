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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ActionCell = ({ row }) => {
  const router = useRouter();
  const [role, setRole] = useState();
  const skillName = row.original.name;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role.toLowerCase());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    const encodedSkill = encodeURIComponent(skillName);
    router.push(`${path}?search=${encodedSkill}`);
  };

  const handleDelete = async () => {
    try {
      const skillDocRef = doc(db, "skills", row.original.id);
      await deleteDoc(skillDocRef);
      console.log("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
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
        <DropdownMenuItem onClick={() => handleNavigation("/activities")}>
          View Activities
        </DropdownMenuItem>
        {role === "admin" && (
          <>
            <DropdownMenuItem onClick={() => {}}>Edit Skill</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Skill
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: "Skill",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Skill
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
      </Button>
    ),
  },
  {
    id: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Code
      </Button>
    ),
    cell: ({ row }) => {
      return row.original.id.toUpperCase();
    },
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Properties
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
