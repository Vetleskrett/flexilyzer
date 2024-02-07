import api from "@/api_utils";
import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import AssignmentSideBar from "@/components/assignmentComponents/SideBar";
import AnalyzerTabs from "@/components/reportPageComponents/AnalyzerTabs";

export default async function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: number;
    assignment_id: number;
  };
}) {
  const assignment_details = await api.getAssignment(params.assignment_id);
  const assignment_analyzers = await api.getAssignmentAnalyzers(
    params.assignment_id
  );

  return (
    <>
      <div className="flex flex-row">
        {/* Sidebar */}
        <AssignmentSideBar
          course_id={params.course_id}
          assignment_id={params.assignment_id}
        />
        <div className="flex-grow">
          <AssignmentMetadata
            name={assignment_details.data.name}
            due_date={assignment_details.data.due_date}
            assignment_id={assignment_details.data.id}
            course_id={params.course_id}
          />
          <div className="flex flex-row justify-center">
            <div className="mt-2">
              <AnalyzerTabs assignment_analyzers={assignment_analyzers.data} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
