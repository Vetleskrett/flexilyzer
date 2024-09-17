import { getAssignmentAnalyzers } from "@/utils/apiUtils";
import AssignmentSideBar from "@/components/assignmentComponents/SideBar";
import AnalyzerTabs from "@/components/analyzerComponents/AnalyzerTabs";

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
  const assignment_analyzers = await getAssignmentAnalyzers(params.assignment_id);

  return (
    <>
      <div className="flex flex-row">
        {/* Sidebar */}
        <AssignmentSideBar
          course_id={params.course_id}
          assignment_id={params.assignment_id}
        />
        <div className="grow">
          <div className="flex flex-row justify-center">
            <div className="">
              <AnalyzerTabs
                assignment_analyzers={assignment_analyzers}
                course_id={params.course_id}
                assignment_id={params.assignment_id}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
