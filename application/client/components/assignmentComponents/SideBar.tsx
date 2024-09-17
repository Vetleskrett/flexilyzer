"use client";
import DividerComponent from "../DividerComponent";

import { useQuery } from "react-query";
import { TeamResponse } from "@/extensions/data-contracts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getCourseTeams } from "@/utils/apiUtils";

interface SideBarProps {
  course_id: number;
  assignment_id: number;
}

export default function AssignmentSideBar({
  course_id,
  assignment_id,
}: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTeamId = searchParams.get("team_id");

  const {
    data: teams,
    error,
    isLoading: isTeamsLoading,
  } = useQuery<TeamResponse[], Error>(
    ["teams", { course_id, assignment_id }],
    () => getCourseTeams(Number(course_id)),
    {
      refetchOnWindowFocus: false,
    },
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (teams && !currentTeamId) {
      router.push(
        pathname + "?" + createQueryString("team_id", `${teams[0].id}`),
      );
    }
  }, [teams, createQueryString, pathname, router, currentTeamId]);

  return (
    <div className="sticky top-16 flex h-[calc(100vh-200px)] min-w-[100px] flex-col overflow-y-auto border-r p-4">
      <p className="mb-3">Teams:</p>
      <DividerComponent />
      {error ? (
        <div>An error occured: {error.message}</div>
      ) : isTeamsLoading ? (
        <>...</>
      ) : (
        teams &&
        teams.map((team) => (
          <div
            key={team.id}
            className="mb-2 cursor-pointer"
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("team_id", `${team.id}`),
              );
            }}
          >
            {Number(currentTeamId) === team.id ? (
              <b>Team {team.id}</b>
            ) : (
              <>Team {team.id}</>
            )}
          </div>
        ))
      )}
    </div>
  );
}
