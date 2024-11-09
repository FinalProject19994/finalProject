import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-full border border-gray-500 bg-white p-2 text-xs text-gray-500 md:flex md:w-auto">
      <Image src="/menuIcons/search.png" alt="search" width={14} height={14} />
      <input
        type="text"
        placeholder="Search from table..."
        className="w-[200px] bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
