"use client";
import DataTable from "@/components/data-table";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function SearchableTable({ columns, data, handleRowSelect, page }) {
  const [filteredData, setFilteredData] = useState([]);
  const searchInputRef = useRef(null);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search");

  // Update filteredData when data prop changes
  useEffect(() => {
    if (initialSearch && searchInputRef.current) {
      // Set the input value
      searchInputRef.current.value = initialSearch;
      // Trigger the search
      handleSearch({ target: { value: initialSearch } });
    } else {
      setFilteredData(data);
    }
  }, [data, initialSearch]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((value) => {
        if (Array.isArray(value)) {
          return value.some((v) =>
            String(v).toLowerCase().includes(searchTerm),
          );
        }
        return String(value).toLowerCase().includes(searchTerm);
      }),
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="relative top-14 flex w-1/2 rounded-md border border-gray-200 p-2 text-sm">
        <Search className="mr-2 opacity-50 dark:text-gray-200" />
        <input
          ref={searchInputRef}
          placeholder={`Search ${page}...`}
          onChange={handleSearch}
          className="w-full bg-white outline-none dark:bg-gray-500"
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
