// skills/SelectedNodeIdContext.js
import { createContext, useState } from "react";

export const SelectedNodeIdContext = createContext();

export const SelectedNodeIdProvider = ({ children }) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  return (
    <SelectedNodeIdContext.Provider
      value={{ selectedNodeId, setSelectedNodeId }}
    >
      {children}
    </SelectedNodeIdContext.Provider>
  );
};
