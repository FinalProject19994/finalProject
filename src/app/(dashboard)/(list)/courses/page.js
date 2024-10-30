import TableHeader from "@/app/components/TableHeader";
import DataTable from "@/app/components/data-table";
import Image from "next/image";
import { columns } from "./columns";

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

// const columns = [
//   {
//     header: "Course Name",
//     accessor: "name",
//     className: "hidden md:table-cell text-center",
//   },
//   {
//     header: "Department",
//     accessor: "department",
//     className: "hidden md:table-cell text-center",
//   },
//   {
//     header: "Course ID",
//     accessor: "courseID",
//     className: "hidden md:table-cell text-center",
//   },
//   {
//     header: "Lecturers",
//     accessor: "lecturers",
//     className: "hidden md:table-cell text-center",
//   },
//   {
//     header: "Activities",
//     accessor: "activities",
//     className: "hidden md:table-cell text-center",
//   },
// ];

const page = () => {
  const renderRow = (course) => {
    return (
      <tr
        key={course.id}
        className="text-center text-sm text-gray-500 odd:bg-nyanza hover:text-black"
      >
        {/* Flex container for data and button */}
        <td className="flex w-full items-center justify-between p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <h3 className="">{course.name}</h3>
            <p className="text-xs text-gray-500 md:hidden">
              {course.department} • {course.courseID}
            </p>
            <p className="text-xs text-gray-500 md:hidden">
              Lecturers: {course.lecturers.join(", ")}
            </p>
          </div>
        </td>

        {/* <td className="hidden md:table-cell">{course.name}</td> */}
        <td className="hidden md:table-cell">{course.department}</td>
        <td className="hidden md:table-cell">{course.courseID}</td>
        <td className="hidden lg:table-cell">{course.lecturers.join(", ")}</td>

        {/* Activities button */}
        <td className="flex justify-center align-bottom md:align-middle">
          <button className="mt-auto rounded-full p-2 hover:brightness-0 md:mb-0 md:mt-0">
            <Image
              src="/menuIcons/activities_black.png"
              alt="Activities"
              width={20}
              height={20}
            />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT - COURSES TABLE */}
      <div className="w-3/5 rounded-md bg-white p-4 shadow-md">
        <TableHeader title="Courses" isAdmin={false} />
        <div className="h-[80dvh] overflow-auto overflow-x-hidden pr-1">
          <DataTable data={courses} columns={columns} />
          {/* <Table columns={columns} renderRow={renderRow} data={activities} /> */}
        </div>
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
