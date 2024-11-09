import Image from "next/image";
import TableSearch from "./TableSearch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TableHeader = ({ title, isAdmin }) => {
  return (
    <div className="mb-8 mt-2 flex items-center justify-between">
      <h1 className="justify-start text-lg font-semibold">All {title}</h1>
      <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full hover:border hover:border-gray-500">
                  <Image
                    src="/menuIcons/filter.png"
                    alt="filter"
                    width={16}
                    height={16}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Filter</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full hover:border hover:border-gray-500">
                  <Image
                    src="/menuIcons/sort.png"
                    alt="sort"
                    width={16}
                    height={16}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Sort</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full hover:border hover:border-gray-500">
                  <Image
                    src="/menuIcons/plus.png"
                    alt="add"
                    width={14}
                    height={14}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Add</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
