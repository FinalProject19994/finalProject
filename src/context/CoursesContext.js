"use client";
import { createContext, useState } from "react";

export const SelectedCourseIdContext = createContext();

export const SelectedCourseIdProvider = ({ children }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  return (
    <SelectedCourseIdContext.Provider
      value={{ selectedCourseId, setSelectedCourseId }}
    >
      {children}
    </SelectedCourseIdContext.Provider>
  );
};
