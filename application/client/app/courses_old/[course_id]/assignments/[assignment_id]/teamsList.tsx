"use client";
import { Api } from "@/extensions/Api";
import { useContext, useEffect, useState } from "react";
import { useTeam } from "../providers";
import { TeamResponse } from "@/extensions/data-contracts";
import { usePathname, useRouter } from "next/navigation";

interface TeamsList {
  course_id: string;
  assignment_id: string;
  teams: TeamResponse[];
}

export default async function TeamsList({
  course_id,
  assignment_id,
  teams,
}: TeamsList) {
  // const { chosenTeam, setChosenTeam, teamIds } = useTeam();

  const pathName = usePathname();

  const router = useRouter();

  return (
    <>
      {teams.map((team) => (
        <div
          onClick={() => {
            if (pathName.endsWith(`/team/${team.id}`)) {
              console.log("true");
              router.push(
                `/courses/${course_id}/assignments/${assignment_id}/`
              );
            } else {
              router.push(
                `/courses/${course_id}/assignments/${assignment_id}/team/${team.id}`
              );
            }
          }}
          key={team.id}
          className="mb-2"
        >
          {pathName.endsWith(`/team/${team.id}`) ? (
            <b>Team {team.id}</b>
          ) : (
            <>Team {team.id}</>
          )}
        </div>
      ))}
    </>
  );
}
