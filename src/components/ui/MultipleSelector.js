"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MultipleSelector({
  options,
  onSelect,
  selection,
  defaultValues = [], // Add defaultValues prop
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Set the initial selected options based on defaultValues
  useEffect(() => {
    if (defaultValues) {
      setSelectedOptions(defaultValues);
    }
  }, [defaultValues]);

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === option.id);
      const newSelectedOptions = isAlreadySelected
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option];

      onSelect(newSelectedOptions);
      return newSelectedOptions;
    });
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter(
      (item) => item.id !== option.id,
    );
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  const filteredOptions = options.filter((option) =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white p-2 text-left text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-400 dark:placeholder-slate-700"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen(!isOpen);
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="mr-2 flex flex-1 flex-wrap items-center gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.id}
                  className="inline-flex items-center rounded-full bg-primary_purple_table px-2 py-0.5 text-xs font-medium text-primary-foreground"
                >
                  {option.label}
                  <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-primary-foreground hover:bg-primary_purple_table_light hover:text-primary focus:bg-primary_purple focus:text-primary focus:outline-none"
                    onClick={(e) => removeOption(option, e)}
                    aria-label={`Remove ${option.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">Select {selection}</span>
            )}
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full rounded-md bg-white shadow-lg focus:outline-none dark:bg-gray-400 sm:text-sm">
            <div className="sticky top-0 z-10 rounded-md bg-white p-2 dark:bg-gray-400">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm leading-5 text-gray-900 focus:outline-none dark:text-white"
                  placeholder={`Search ${selection}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                />
              </div>
            </div>
            <ul
              className="max-h-48 overflow-auto py-2 text-base"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-0"
            >
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`relative m-1 select-none rounded-md px-3 py-2 hover:bg-primary_purple_table hover:text-primary-foreground ${
                    selectedOptions.some((item) => item.id === option.id)
                      ? "bg-primary_purple text-primary-foreground"
                      : ""
                  }`}
                  id={`listbox-option-${option.id}`}
                  role="option"
                  aria-selected={selectedOptions.some(
                    (item) => item.id === option.id,
                  )}
                  onClick={() => toggleOption(option)}
                >
                  <span className="block truncate">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
