import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import AssignmentSideBar from "@/components/assignmentComponents/SideBar";
import { Api } from "@/extensions/Api";

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
  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });
  const assignment_details = await api.getAssignment(params.assignment_id);
  return (
    <>
      <AssignmentMetadata
        name={assignment_details.data.name}
        due_date={assignment_details.data.due_date}
      />
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
