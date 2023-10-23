"use client";
import { Api } from "@/extensions/Api";
import { useContext } from "react";
import { useTeam } from "./providers";

interface Props {
  course_id: string;
}

export default async function TeamsList({ course_id }: Props) {
  const { chosenTeam, setChosenTeam } = useTeam();
    const api = new Api({ baseUrl: "http://localhost:8000" });
    const teams = await api.getCourseTeams(Number(course_id));

  // const teams = { data: [{ id: 1 }, { id: 3 }] };

  return (
    <>
      {teams.data.map((team) => (
        <div
          onClick={() => {
            console.log("here");
            console.log(chosenTeam);
            setChosenTeam(team.id);
          }}
          key={team.id}
          className="mb-2"
        >
          {chosenTeam === team.id ? <b>Team {team.id}</b> : <>Team {team.id}</>}
        </div>
      ))}
    </>
  );
}
