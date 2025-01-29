"use client";
import DataTable from "@/components/data-table";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

// --- Helper Functions for Search Logic ---

const searchInCourse = (value, searchTerm) => {
  return typeof value === "object" && value !== null && value.title
    ? String(value.title).toLowerCase().includes(searchTerm)
    : false;
};

const searchInSkills = (value, searchTerm) => {
  return Array.isArray(value)
    ? value.some((skill) =>
        typeof skill === "object" && skill !== null && skill.name
          ? String(skill.name).toLowerCase().includes(searchTerm)
          : String(skill).toLowerCase().includes(searchTerm),
      )
    : false;
};

const searchInLecturers = (value, searchTerm) => {
  return Array.isArray(value)
    ? value.some((lecturer) =>
        typeof lecturer === "object" && lecturer !== null && lecturer.name
          ? String(lecturer.name).toLowerCase().includes(searchTerm)
          : String(lecturer).toLowerCase().includes(searchTerm),
      )
    : false;
};

const searchInArray = (value, searchTerm) => {
  return Array.isArray(value)
    ? value.some((v) => String(v).toLowerCase().includes(searchTerm))
    : false;
};

const searchInString = (value, searchTerm) => {
  return String(value).toLowerCase().includes(searchTerm);
};

export function SearchableTable({ columns, data, handleRowSelect, page }) {
  const [filteredData, setFilteredData] = useState([]);
  const searchInputRef = useRef(null);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search");

  useEffect(() => {
    if (initialSearch && searchInputRef.current) {
      searchInputRef.current.value = initialSearch;
      handleSearch({ target: { value: initialSearch } });
    } else {
      setFilteredData(data);
    }
  }, [data, initialSearch]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.entries(item).some(([key, value]) => {
        // Dispatch search logic to helper functions based on key
        switch (key) {
          case "course":
            return searchInCourse(value, searchTerm);
          case "skills":
            return searchInSkills(value, searchTerm);
          case "lecturers":
            return searchInLecturers(value, searchTerm);
          default:
            return searchInString(value, searchTerm); // Default to string search for other columns
        }
      }),
    );
    setFilteredData(filtered);
  };

  return (
    <div className="overflow-auto">
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
