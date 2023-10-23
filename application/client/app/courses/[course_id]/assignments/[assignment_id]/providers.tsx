"use client";
import React, { useContext, useState } from "react";

// Define the context type
type TeamContextType = {
  chosenTeam: number | undefined;
  setChosenTeam: React.Dispatch<React.SetStateAction<number | undefined>>;
};

// Create the context with a default value
const TeamContext = React.createContext<TeamContextType | undefined>(undefined);

function TeamProvider({ children }: { children: React.ReactNode }) {
  const [chosenTeam, setChosenTeam] = useState<number | undefined>(undefined);

  return (
    <TeamContext.Provider value={{ chosenTeam, setChosenTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

// Custom hook to use the context
const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

export { TeamProvider, useTeam };
