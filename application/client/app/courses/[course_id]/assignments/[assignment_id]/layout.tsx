import api from "@/api_utils";
import AssignmentInfo from "@/components/assignmentComponents/AssignmentInfo";
import AssignmentSideBar from "@/components/assignmentComponents/SideBar";
import AnalyzerTabs from "@/components/reportPageComponents/AnalyzerTabs";

export default async function AssignmentOverviewLayout({
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
    params.assignment_id,
    { cache: "no-cache" }
  );
  const course = await api.getCourse(params.course_id, {
    cache: "no-cache",
  });

  return (
    <>
      <div className='flex flex-row'>
        <div className='flex-grow'>
          <AssignmentInfo
            left_text={`${assignment_details.data.name} (${course.data.tag}
    ${course.data.name && `- ${course.data.name}`})`}
            due_date={assignment_details.data.due_date}
            assignment_id={assignment_details.data.id}
            course_id={params.course_id}
          />
          {children}
        </div>
      </div>
    </>
  );
}
