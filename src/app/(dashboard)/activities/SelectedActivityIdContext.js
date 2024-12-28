import { createContext, useState } from "react";

export const SelectedActivityIdContext = createContext();

export const SelectedActivityIdProvider = ({ children }) => {
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  return (
    <SelectedActivityIdContext.Provider
      value={{ selectedActivityId, setSelectedActivityId }}
    >
      {children}
    </SelectedActivityIdContext.Provider>
  );
};
