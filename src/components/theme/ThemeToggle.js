"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center hover:text-black dark:hover:text-white"
    >
      {theme === "dark" ? (
        <Moon className="size-7" />
      ) : (
        <Sun className="size-7" />
      )}
      <span className="ml-2">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;
