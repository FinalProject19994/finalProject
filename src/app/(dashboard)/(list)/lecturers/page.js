import DataTable from "@/components/data-table";
import TableHeader from "@/components/TableHeader";
import Image from "next/image";
import { columns } from "./columns";

const lecturers = [
  {
    avatar: "/avatars/panda.png",
    name: "Bruno Mars",
    id: 1,
    department: "Computer Science",
    mail: "bruno.mars@example.com",
    phone: "+1 (123) 456-7890",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Scarlett Johansson",
    id: 2,
    department: "Mathematics",
    mail: "scarlett.johansson@example.com",
    phone: "+1 (987) 654-3210",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Chris Hemsworth",
    id: 3,
    department: "Biology",
    mail: "chris.hemsworth@example.com",
    phone: "+1 (555) 123-4567",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Jennifer Lawrence",
    id: 4,
    department: "Physics",
    mail: "jennifer.lawrence@example.com",
    phone: "+1 (777) 777-7777",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Robert Downey Jr.",
    id: 5,
    department: "Chemistry",
    mail: "robert.downeyJr@example.com",
    phone: "+1 (555) 555-5555",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Julia Roberts",
    id: 6,
    department: "Geology",
    mail: "julia.roberts@example.com",
    phone: "+1 (123) 456-7890",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Tom Hanks",
    id: 7,
    department: "History",
    mail: "tom.hanks@example.com",
    phone: "+1 (987) 654-3210",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Meryl Streep",
    id: 8,
    department: "Philosophy",
    mail: "meryl.streep@example.com",
    phone: "+1 (555) 123-4567",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Denzel Washington",
    id: 9,
    department: "English",
    mail: "denzel.washington@example.com",
    phone: "+1 (777) 777-7777",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Ariana Grande",
    id: 10,
    department: "Music",
    mail: "ariana.grande@example.com",
    phone: "+1 (123) 456-7890",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Taylor Swift",
    id: 12,
    department: "Music",
    mail: "taylor.swift@example.com",
    phone: "+1 (555) 123-4567",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Katy Perry",
    id: 13,
    department: "Music",
    mail: "katy.perry@example.com",
    phone: "+1 (777) 777-7777",
  },
  {
    avatar: "/avatars/panda.png",
    name: "Selena Gomez",
    id: 14,
    department: "Music",
    mail: "selena.gomez@example.com",
    phone: "+1 (123) 456-7890",
  },
];

const TeacherListPage = () => {
  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      <DataTable columns={columns} data={lecturers} />
    </div>
  );
};

export default TeacherListPage;
