"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export default function Component({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option],
    );
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    setSelectedOptions((prev) => prev.filter((item) => item.id !== option.id));
  };

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

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 text-left focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setIsOpen(!isOpen)}
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
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-primary-foreground hover:bg-primary-foreground hover:text-primary focus:bg-primary-foreground focus:text-primary focus:outline-none"
                    onClick={(e) => removeOption(option, e)}
                    aria-label={`Remove ${option.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">Select options</span>
            )}
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-0"
          >
            {options.map((option) => (
              <li
                key={option.id}
                className={`relative m-1 cursor-default select-none rounded-md px-3 py-2 hover:bg-primary_purple hover:text-primary-foreground ${
                  selectedOptions.some((item) => item.id === option.id)
                    ? "bg-primary_purple_table text-primary-foreground"
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
        )}
      </div>
    </div>
  );
}
