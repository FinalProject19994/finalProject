import DataTable from "@/components/data-table";
import { columns } from "./columns";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import MultipleSelector from "@/components/ui/MultipleSelector";

const courses = [
  {
    id: 1,
    title: "Computing for Business",
    department: "Computer Science",
    courseID: "CS101",
    lecturers: ["John Smith", "Jane Doe"],
  },
  {
    id: 2,
    title: "Data Mining",
    department: "Mathematics",
    courseID: "MTH205",
    lecturers: ["Bob Johnson", "Alice Brown"],
  },
  {
    id: 3,
    title: "Computational Biology",
    department: "Biology",
    courseID: "BIO301",
    lecturers: ["John Smith", "Jane Doe", "Bob Johnson"],
  },
  {
    id: 4,
    title: "Computer Networks",
    department: "Computer Science",
    courseID: "CS202",
    lecturers: ["Alice Brown", "John Smith"],
  },
  {
    id: 5,
    title: "Mathematics",
    department: "Mathematics",
    courseID: "MTH101",
    lecturers: ["Bob Johnson", "Jane Doe"],
  },
  {
    id: 6,
    title: "Statistics",
    department: "Mathematics",
    courseID: "MTH201",
    lecturers: ["John Smith", "Bob Johnson"],
  },
  {
    id: 7,
    title: "Computer Vision",
    department: "Computer Science",
    courseID: "CS301",
    lecturers: ["Jane Doe", "Alice Brown"],
  },
  {
    id: 8,
    title: "Database Systems",
    department: "Computer Science",
    courseID: "CS302",
    lecturers: ["Bob Johnson", "John Smith"],
  },
  {
    id: 9,
    title: "Artificial Intelligence",
    department: "Computer Science",
    courseID: "CS303",
    lecturers: ["Jane Doe", "Alice Brown", "Bob Johnson"],
  },
  {
    id: 10,
    title: "Machine Learning",
    department: "Computer Science",
    courseID: "CS304",
    lecturers: ["John Smith", "Jane Doe", "Bob Johnson"],
  },
  {
    id: 11,
    title: "Web Development",
    department: "Computer Science",
    courseID: "CS305",
    lecturers: ["Alice Brown", "John Smith"],
  },
  {
    id: 12,
    title: "Operating Systems",
    department: "Computer Science",
    courseID: "CS306",
    lecturers: ["Bob Johnson", "Jane Doe"],
  },
  {
    id: 13,
    title: "Quantum Computing",
    department: "Physics",
    courseID: "PHY401",
    lecturers: ["Albert Einstein", "Niels Bohr"],
  },
  {
    id: 14,
    title: "Astrophysics",
    department: "Physics",
    courseID: "PHY402",
    lecturers: ["Carl Sagan", "Stephen Hawking"],
  },
  {
    id: 15,
    title: "Organic Chemistry",
    department: "Chemistry",
    courseID: "CHEM301",
    lecturers: ["Marie Curie", "Linus Pauling"],
  },
  {
    id: 16,
    title: "Genetics",
    department: "Biology",
    courseID: "BIO302",
    lecturers: ["Gregor Mendel", "Rosalind Franklin"],
  },
  {
    id: 17,
    title: "Environmental Science",
    department: "Environmental Studies",
    courseID: "ENV201",
    lecturers: ["Rachel Carson", "David Attenborough"],
  },
];

const page = () => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* ADD ACTIVITY MODAL */}
      <Dialog>
        <DialogTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:border hover:border-gray-500">
          <Image src="/menuIcons/plus.png" alt="add" width={14} height={14} />
        </DialogTrigger>
        <DialogContent className="text-sm">
          <DialogHeader>
            <DialogTitle className="text-center">ADD ACTIVITY</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="Enter a title..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <MultipleSelector
            options={[
              { id: 1, label: "Communication" },
              { id: 2, label: "Teamwork" },
              { id: 3, label: "Problem Solving" },
              { id: 4, label: "Leadership" },
              { id: 5, label: "Creativity" },
              { id: 6, label: "Adaptability" },
              { id: 7, label: "Critical Thinking" },
              { id: 8, label: "Interpersonal Skills" },
            ]}
          />
          <input
            type="number"
            placeholder="Week number..."
            max={13}
            min={1}
            className="w-1/2 rounded-md border p-2 text-gray-700 outline-none"
          />
          <textarea
            placeholder="Enter description..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <textarea
            placeholder="Enter reflection..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-gray-200 text-sm text-gray-700 file:mr-2 file:border-0 file:bg-gray-300 file:px-2 file:py-3 file:text-gray-700 focus:z-10"
          />
          {/* <Link
              href="/surveys"
              className="text-primary_purple hover:underline"
            >
              Surveys
            </Link> */}
          <button className="w-full rounded-md bg-primary_purple p-2 text-white">
            Add
          </button>
        </DialogContent>
      </Dialog>

      {/* LEFT - COURSES TABLE */}
      <div className="w-3/5 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
        <DataTable data={courses} columns={columns} />
      </div>

      {/* RIGHT - GRAPH */}
      <div className="flex w-2/5 gap-4 rounded-md text-3xl">
        <div className="h-full w-full rounded-md bg-white shadow-md">
          Nodes and Edges Graph
        </div>
      </div>
    </div>
  );
};

export default page;
