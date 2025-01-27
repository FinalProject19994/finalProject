"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";

export default function ComboBox({ options, onSelect, title, defaultValue }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = (currentValue) => {
    const selectedOption = options.find(
      (option) => option.value === currentValue,
    );

    setValue(currentValue); // Set value state

    // Call onSelect with the selected option only
    onSelect && onSelect(selectedOption);

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `Select ${title}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandList>
            <CommandEmpty>Nothing found.</CommandEmpty>
            <CommandGroup>
              {options.map((selection) => (
                <CommandItem
                  key={selection.value}
                  value={selection.label}
                  onSelect={() => handleSelect(selection.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === selection.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {selection.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
