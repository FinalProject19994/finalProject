"use client";
import DataTable from "@/components/data-table";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchableTable({ columns, data, handleRowSelect, page }) {
  const [filteredData, setFilteredData] = useState([]);

  // Update filteredData when data prop changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm),
      ),
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="relative top-14 flex w-1/2 rounded-md border border-gray-200 p-2 text-sm">
        <Search className="mr-2 opacity-50" />
        <input
          placeholder={`Search ${page}...`}
          onChange={handleSearch}
          className="w-full outline-none"
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        handleRowSelect={handleRowSelect}
        page={page}
      />
    </div>
  );
}
