import { Api } from "@/extensions/Api";
import Link from "next/link";
import DividerComponent from "../DividerComponent";

import { headers } from "next/headers";

interface SideBarProps {
  course_id: number;
  assignment_id: number;
  team_name: string;
}

export default async function AssignmentSideBar({
  course_id,
  assignment_id,
  team_name,
}: SideBarProps) {
  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });
  const teams = await api.getCourseTeams(Number(course_id));

  return (
    <div className="flex flex-col p-4 border-r sticky top-16 h-[calc(100vh-80px)] overflow-y-auto">
      <b className="mb-3">All teams:</b>
      <DividerComponent />
      {teams.data.map((team) => (
        <Link
          href={`/courses/${course_id}/assignments/${assignment_id}/team-${team.id}`}
        >
          <div key={team.id} className="mb-2">
            {team_name === `team-${team.id}` ? (
              <b>Team {team.id}</b>
            ) : (
              <>Team {team.id}</>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
