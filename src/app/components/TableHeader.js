import Image from "next/image";
import TableSearch from "./TableSearch";

const TableHeader = ({ title }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      {/* TODO: move the title to the same line as the buttons */}
      <h1 className="justify-start text-lg font-semibold">All {title}</h1>
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
  );
};

export default TableHeader;
