"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="flex items-center">
      {theme === "dark" ? <Moon /> : <Sun />}
      <span className="">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;
