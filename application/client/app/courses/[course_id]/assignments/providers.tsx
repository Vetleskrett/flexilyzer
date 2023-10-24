"use client";
import React, { useContext, useState, useCallback } from "react";

type TeamContextType = {
  chosenTeam: number | undefined;
  setChosenTeam: React.Dispatch<React.SetStateAction<number | undefined>>;
  teamIds: number[];
  setTeamIds: (teams: any[]) => void; // Adjusted setter to accept an array of teams
};

const TeamContext = React.createContext<TeamContextType | undefined>(undefined);

function TeamProvider({ children }: { children: React.ReactNode }) {
  const [chosenTeam, setChosenTeam] = useState<number | undefined>(undefined);
  const [teamIds, setTeamIdsState] = useState<number[]>([]);

  const setTeamIds = useCallback((teams: any[]) => {
    const ids = teams.map((team) => team.id); // Assume each team object has an id property
    setTeamIdsState(ids);
  }, []);

  return (
    <TeamContext.Provider
      value={{ chosenTeam, setChosenTeam, teamIds, setTeamIds }}
    >
      {children}
    </TeamContext.Provider>
  );
}

const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

export { TeamProvider, useTeam };
