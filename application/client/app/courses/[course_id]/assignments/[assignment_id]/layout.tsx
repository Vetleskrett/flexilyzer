"use client";
import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import { Divider } from "@nextui-org/react";

interface Props {
  params: { tag: string; id: string };
}

export default function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
}) {
  const assigment_details = {
    id: 1,
    course: 1,
    name: "Øving 3",
    due_date: "2023-12-20T23:59:00",
  };

  const teams = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
  ];
  console.log(params);
  return (
    <>
      <AssignmentMetadata
        name={assigment_details.name}
        due_date={assigment_details.due_date}
      />
      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col p-4 border-r sticky top-16 max-h-830px overflow-y-auto">
          <b className="mb-3">All teams:</b>
          <Divider className="mb-3" />
          {teams.map((team) => (
            <div key={team.id} className="mb-2">
              Team {team.id}
            </div>
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </>
  );
}
