"use client";

import { TeamResponse } from "@/extensions/data-contracts";
import { Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

interface TeamsList {
  course_id: number;
  assignment_id: number;
  teams: TeamResponse[];
}

export default function SideBarTeams({
  course_id,
  assignment_id,
  teams,
}: TeamsList) {
  const pathName = usePathname();

  const router = useRouter();

  return (
    <>
      <Divider className="mb-3" />
      {teams.map((team) => (
        <div
          onClick={() => {
            if (pathName.endsWith(`/team-${team.id}`)) {
              router.push(
                `/courses/${course_id}/assignments/${assignment_id}/`
              );
            } else {
              router.push(
                `/courses/${course_id}/assignments/${assignment_id}/team-${team.id}`
              );
            }
          }}
          key={team.id}
          className="mb-2"
        >
          {pathName.endsWith(`/team-${team.id}`) ? (
            <b>Team {team.id}</b>
          ) : (
            <>Team {team.id}</>
          )}
        </div>
      ))}
    </>
  );
}
