"use client";
import { createContext, useState } from "react";

export const SelectedSkillIdContext = createContext();

export const SelectedNodeIdProvider = ({ children }) => {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  return (
    <SelectedSkillIdContext.Provider
      value={{ selectedSkillId, setSelectedSkillId }}
    >
      {children}
    </SelectedSkillIdContext.Provider>
  );
};
