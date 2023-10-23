"use client";
import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import { Api } from "@/extensions/Api";
import { Divider } from "@nextui-org/react";
import TeamsList from "./teamsList";
import DividerComponent from "@/components/DividerComponent";
import { TeamProvider } from "./providers";

export default function AssignmentLayout({
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

  return (
    <>
      <AssignmentMetadata
        name={assigment_details.name}
        due_date={assigment_details.due_date}
      />
      <TeamProvider>
        <div className="flex">
          {/* Sidebar */}
          <div className="flex flex-col p-4 border-r sticky top-16 h-[calc(100vh-80px)] overflow-y-auto">
            <b className="mb-3">All teams:</b>
            <DividerComponent />
            <TeamsList course_id={params.course_id} />
          </div>
          {/* Main Content */}
          <div className="flex-1 p-4">{children}</div>
        </div>
      </TeamProvider>
    </>
  );
}
