"use client";

import DataTable from "@/components/data-table";
import Image from "next/image";
import { columns } from "./columns";

const skills = [
  {
    id: 1,
    skill: "Web Development",
    category: "Development",
  },
  {
    id: 2,
    skill: "Data Analysis",
    category: "Data Science",
  },
  {
    id: 3,
    skill: "Machine Learning",
    category: "Artificial Intelligence",
  },
  {
    id: 4,
    skill: "Public Speaking",
    category: "Communication",
  },
  {
    id: 5,
    skill: "Time Management",
    category: "Productivity",
  },
  {
    id: 6,
    skill: "Teamwork",
    category: "Collaboration",
  },
  {
    id: 7,
    skill: "Problem Solving",
    category: "Logic",
  },
  {
    id: 8,
    skill: "Communication",
    category: "Interpersonal Skills",
  },
  {
    id: 9,
    skill: "Adaptability",
    category: "Personal Skills",
  },
  {
    id: 10,
    skill: "Leadership",
    category: "Management",
  },
  {
    id: 11,
    skill: "Digital Marketing",
    category: "Marketing",
  },
  {
    id: 12,
    skill: "User Experience",
    category: "Design",
  },
  {
    id: 13,
    skill: "Cloud Computing",
    category: "Cloud",
  },
  {
    id: 14,
    skill: "Cybersecurity",
    category: "Security",
  },
  {
    id: 15,
    skill: "Artificial Intelligence",
    category: "Artificial Intelligence",
  },
  {
    id: 16,
    skill: "Data Visualization",
    category: "Data Science",
  },
  {
    id: 17,
    skill: "Computer Vision",
    category: "Artificial Intelligence",
  },
  {
    id: 18,
    skill: "Robotics",
    category: "Artificial Intelligence",
  },
];

const page = () => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <div className="flex gap-4 rounded-md text-3xl md:w-3/4">
        <div className="h-full w-full rounded-md bg-white shadow-md"></div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col overflow-y-scroll rounded-md bg-white px-2 shadow-md md:w-1/4">
        {/* Scrollable activities list */}
        <DataTable columns={columns} data={skills} />
      </div>
    </div>
  );
};

export default page;
