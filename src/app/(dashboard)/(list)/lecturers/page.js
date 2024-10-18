import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
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
];

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "mail",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
];

const TeacherListPage = () => {
  const renderRow = (item) => {
    return (
      <tr
        key={item.id}
        className="border-collapse rounded-md border-t-2 text-sm odd:bg-primary_lightblue even:bg-primary_lightyellow hover:brightness-95"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.avatar}
            alt="image"
            width={20}
            height={20}
            className="w-10 rounded-full object-cover"
          />
          <h3 className="font-semibold">{item.name}</h3>
        </td>
        <td className="hidden md:table-cell">{item.department}</td>
        <td>{item.mail}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
      </tr>
    );
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 rounded-md bg-white p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All lecturers</h1>
        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary_yellow">
              <Image
                src="/menuIcons/filter.png"
                alt="filter"
                width={16}
                height={16}
              />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary_yellow">
              <Image
                src="/menuIcons/sort.png"
                alt="filter"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={lecturers} />
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
