import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableHeader from "@/app/components/TableHeader";

const courses = [
  {
    id: 1,
    name: "Computing for Business",
    department: "Computer Science",
    courseID: "CS101",
    lecturers: ["John Smith", "Jane Doe"],
  },
  {
    id: 2,
    name: "Data Mining",
    department: "Mathematics",
    courseID: "MTH205",
    lecturers: ["Bob Johnson", "Alice Brown"],
  },
  {
    id: 3,
    name: "Computational Biology",
    department: "Biology",
    courseID: "BIO301",
    lecturers: ["John Smith", "Jane Doe", "Bob Johnson"],
  },
  {
    id: 4,
    name: "Computer Networks",
    department: "Computer Science",
    courseID: "CS202",
    lecturers: ["Alice Brown", "John Smith"],
  },
  {
    id: 5,
    name: "Mathematics",
    department: "Mathematics",
    courseID: "MTH101",
    lecturers: ["Bob Johnson", "Jane Doe"],
  },
  {
    id: 6,
    name: "Statistics",
    department: "Mathematics",
    courseID: "MTH201",
    lecturers: ["John Smith", "Bob Johnson"],
  },
  {
    id: 7,
    name: "Computer Vision",
    department: "Computer Science",
    courseID: "CS301",
    lecturers: ["Jane Doe", "Alice Brown"],
  },
  {
    id: 8,
    name: "Database Systems",
    department: "Computer Science",
    courseID: "CS302",
    lecturers: ["Bob Johnson", "John Smith"],
  },
  {
    id: 9,
    name: "Artificial Intelligence",
    department: "Computer Science",
    courseID: "CS303",
    lecturers: ["Jane Doe", "Alice Brown", "Bob Johnson"],
  },
  {
    id: 10,
    name: "Machine Learning",
    department: "Computer Science",
    courseID: "CS304",
    lecturers: ["John Smith", "Jane Doe", "Bob Johnson"],
  },
  {
    id: 11,
    name: "Web Development",
    department: "Computer Science",
    courseID: "CS305",
    lecturers: ["Alice Brown", "John Smith"],
  },
  {
    id: 12,
    name: "Operating Systems",
    department: "Computer Science",
    courseID: "CS306",
    lecturers: ["Bob Johnson", "Jane Doe"],
  },
  {
    id: 13,
    name: "Quantum Computing",
    department: "Physics",
    courseID: "PHY401",
    lecturers: ["Albert Einstein", "Niels Bohr"],
  },
  {
    id: 14,
    name: "Astrophysics",
    department: "Physics",
    courseID: "PHY402",
    lecturers: ["Carl Sagan", "Stephen Hawking"],
  },
  {
    id: 15,
    name: "Organic Chemistry",
    department: "Chemistry",
    courseID: "CHEM301",
    lecturers: ["Marie Curie", "Linus Pauling"],
  },
  {
    id: 16,
    name: "Genetics",
    department: "Biology",
    courseID: "BIO302",
    lecturers: ["Gregor Mendel", "Rosalind Franklin"],
  },
  {
    id: 17,
    name: "Environmental Science",
    department: "Environmental Studies",
    courseID: "ENV201",
    lecturers: ["Rachel Carson", "David Attenborough"],
  },
];

const columns = [
  {
    header: "Course Name",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Course ID",
    accessor: "courseID",
    className: "hidden md:table-cell",
  },
  {
    header: "Lecturers",
    accessor: "lecturers",
    className: "hidden md:table-cell",
  },
];

const page = () => {
  const renderRow = (course) => {
    return (
      <tr
        key={course.id}
        className="text-sm odd:bg-primary_lightblue hover:bg-slate-200"
      >
        {/* Flex container for data and button */}
        <td className="flex w-full items-center justify-between p-4">
          {/* Data content on the left */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-xs text-gray-500 md:hidden">
              {course.department} • {course.courseID}
            </p>
            <p className="text-xs text-gray-500 md:hidden">
              Lecturers: {course.lecturers.join(", ")}
            </p>
          </div>
        </td>

        <td className="hidden md:table-cell">{course.department}</td>
        <td className="hidden md:table-cell">{course.courseID}</td>
        <td className="hidden lg:table-cell">{course.lecturers.join(", ")}</td>

        {/* Activities button */}
        <td className="align-bottom md:align-middle">
          <button className="mb-2 mr-1 mt-auto rounded-md bg-primary_yellow px-4 py-2 hover:bg-yellow-300 md:mb-0 md:mt-0">
            Activities
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 rounded-md bg-white p-4 shadow-md">
      <TableHeader title={"Courses"} />

      <div className="h-[80dvh] overflow-auto rounded-lg">
        <Table columns={columns} renderRow={renderRow} data={courses} />
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default page;
