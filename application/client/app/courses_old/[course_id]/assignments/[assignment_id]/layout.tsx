"use client";
import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import { Api } from "@/extensions/Api";
import { Divider } from "@nextui-org/react";
import TeamsList from "./teamsList";
import DividerComponent from "@/components/DividerComponent";
import { TeamProvider, useTeam } from "../providers";
import { Suspense, useEffect, useMemo, useState } from "react";
import { TeamResponse } from "@/extensions/data-contracts";
import AssigmentReports from "./page";

export default async function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: string;
    assignment_id: string;
  };
}) {
  const assigment_details = {
    id: 1,
    course: 1,
    name: "Øving 3",
    due_date: "2023-12-20T23:59:00",
  };

  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });
  const teams = await api.getCourseTeams(Number(params.course_id));

  console.log("in layout");
  // const { setTeamIds } = useTeam(); // Destructure setTeamIds from the useTeam hook

  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     const api = new Api({ baseUrl: "http://127.0.0.1:8000" });
  //     const teams = await api.getCourseTeams(Number(params.course_id));
  //     setTeamIds(teams.data); // Assume teams.data is an array of team objects
  //   };

  //   fetchTeams(); // Call fetchTeams
  // }, [params.course_id, setTeamIds]); // Add dependencies to useEffect

  return (
    <>
      {/* <AssignmentMetadata
        name={assigment_details.name}
        due_date={assigment_details.due_date}
      /> */}
      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col p-4 border-r sticky top-16 h-[calc(100vh-80px)] overflow-y-auto">
          <b className="mb-3">All teams:</b>
          <DividerComponent />
          <Suspense fallback={null}>
            <TeamsList
              teams={teams.data}
              course_id={params.course_id}
              assignment_id={params.assignment_id}
            />
          </Suspense>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </>
  );
}
