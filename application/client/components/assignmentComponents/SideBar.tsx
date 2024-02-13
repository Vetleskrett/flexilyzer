"use client";
import Link from "next/link";
import DividerComponent from "../DividerComponent";

import api from "@/api_utils";
import { useQuery, useQueryClient } from "react-query";
import { TeamResponse } from "@/extensions/data-contracts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

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

  const current_team_id = searchParams.get("team_id");

  const fetchTeams = async () => {
    const resp = await api.getCourseTeams(Number(course_id));
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  const {
    data: teams,
    error,
    isLoading: isTeamsLoading,
  } = useQuery<TeamResponse[], Error>(
    ["teams", { course_id, assignment_id }],
    fetchTeams,
    {
      refetchOnWindowFocus: false,
    }
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (teams) {
      router.push(
        pathname + "?" + createQueryString("team_id", `${teams[0].id}`)
      );
    }
  }, [teams]);

  return (
    <div className="flex flex-col p-4 border-r sticky top-16 h-[calc(100vh-80px)] overflow-y-auto">
      <b className="mb-3">Teams:</b>
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
                pathname + "?" + createQueryString("team_id", `${team.id}`)
              );
            }}
          >
            {Number(current_team_id) === team.id ? (
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
