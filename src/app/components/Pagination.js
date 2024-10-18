import Image from "next/image";
import React from "react";

const Pagination = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 p-4 text-gray-500">
      <button className="disabled:opacity-150 rounded-full bg-slate-100 px-3 py-3 hover:bg-slate-300 disabled:opacity-50">
        <Image src="/menuIcons/back.png" alt="back" width={16} height={16} />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="rounded-full bg-primary_blue px-2 py-1">1</button>
        <button className="rounded-full">2</button>
        <button className="rounded-full">3</button>
        ...
        <button className="rounded-full">10</button>
      </div>
      <button className="disabled:opacity-150 rounded-full bg-slate-100 px-3 py-3 hover:bg-slate-300 disabled:opacity-50">
        <Image src="/menuIcons/next.png" alt="next" width={16} height={16} />
      </button>
    </div>
  );
};

export default Pagination;
