import AssignmentSideBar from "@/components/assignmentComponents/SideBar";

export default async function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: number;
    assignment_id: number;
    team: string;
  };
}) {
  return (
    <>
      {/* <AssignmentMetadata
        name={assigment_details.name}
        due_date={assigment_details.due_date}
      /> */}
      <div className="flex">
        {/* Sidebar */}
        <AssignmentSideBar
          course_id={params.course_id}
          assignment_id={params.assignment_id}
          team_name={params.team}
        />
        {/* Main Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </>
  );
}
