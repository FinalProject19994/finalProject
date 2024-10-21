import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableHeader from "@/app/components/TableHeader";
import Image from "next/image";

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

const columns = [
  {
    header: "Name",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "mail",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "",
    accessor: "activity",
    className: "hidden md:table-cell",
  },
];

const TeacherListPage = () => {
  const renderRow = (lecturer) => {
    return (
      <tr
        key={lecturer.id}
        className="text-sm odd:bg-primary_lightblue hover:bg-slate-200"
      >
        {/* Flex container for data and button */}
        <td className="flex w-full items-center justify-between p-4">
          {/* Data content on the left */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Image
              src={lecturer.avatar}
              alt={lecturer.name}
              width={40}
              height={40}
              className="hidden md:block"
            />
            <h3 className="font-semibold">{lecturer.name}</h3>
            <p className="text-xs text-gray-500 md:hidden">
              {lecturer.department} {lecturer.mail}
            </p>
            <p className="text-xs text-gray-500 md:hidden">
              {/* Lecturers: {lecturer.lecturers.join(", ")} */}
            </p>
          </div>
        </td>

        {/* Department column, visible on medium screens and up */}
        <td className="hidden md:table-cell">{lecturer.department}</td>

        {/* Email column */}
        <td className="hidden lg:table-cell">{lecturer.mail}</td>

        {/* Phone column, visible on medium screens and up */}
        <td className="hidden md:table-cell">{lecturer.phone}</td>

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
      <TableHeader title={"Lecturers"} />

      <div className="h-[80dvh] overflow-auto rounded-lg">
        <Table columns={columns} renderRow={renderRow} data={lecturers} />
      </div>
    </div>
  );
};

export default TeacherListPage;
