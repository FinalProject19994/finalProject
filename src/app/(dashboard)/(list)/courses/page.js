import React from "react";
import Image from "next/image";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Pagination from "@/app/components/Pagination";

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
    header: "Course ID",
    accessor: "corseId",
  },
  {
    header: "Lecturers",
    accessor: "lecturers",
    className: "hidden md:table-cell",
  },
];

const page = () => {
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
        <h1 className="hidden text-lg font-semibold md:block">All courses</h1>
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
      <Table columns={columns} renderRow={renderRow} data={courses} />
      <Pagination />
    </div>
  );
};

export default page;
