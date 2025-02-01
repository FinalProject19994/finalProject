"use client";
import { Button } from "@/components/ui/button";
import FavoriteHeart from "@/components/ui/FavoriteHeart";
import ThumbsUpButton from "@/components/ui/ThumbsUpButton";

export const columns = [
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
];
