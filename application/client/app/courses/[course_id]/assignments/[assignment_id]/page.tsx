import api from "@/api_utils";
import AssignmentAnalyzer from "@/components/assignmentComponents/AssignmentAnalyzer";
import AssignmentDueDate from "@/components/assignmentComponents/AssignmentDueDate";
import ConnectAsssignmentAnalyzer from "@/components/assignmentComponents/ConnectAssignmentAnalyzer";
import { CreateButton } from "@/components/buttons";
import { BatchReponse } from "@/extensions/data-contracts";
import { Suspense } from "react";

interface Props {
  params: { course_id: string; assignment_id: string };
}

export default async function AssignmentDetails({ params }: Props) {
  const course = await api.getCourse(Number(params.course_id), {
    cache: "no-cache",
  });
  const assignment = await api.getAssignment(Number(params.assignment_id), {
    cache: "no-cache",
  });

  const analyzers = await api.getAssignmentAnalyzers(
    Number(params.assignment_id),
    { cache: "no-cache" }
  );

  return (
    <>
      <h2 className='h2 flex justify-center'>
        {assignment.data.name} ({course.data.tag}{" "}
        {course.data.name ? <>- {course.data.name}</> : ""})
      </h2>
      <div className='flex justify-center'>
        <AssignmentDueDate
          assignment_id={assignment.data.id}
          due_date={
            assignment.data.due_date ? assignment.data.due_date : undefined
          }
        />
      </div>
      <div className='h2 my-8 flex justify-center'>
        <h2>
          Connected analyzers: <ConnectAsssignmentAnalyzer />
        </h2>
      </div>
      <div className='flex overflow-x-auto  space-x-4'>
        {analyzers.data.map((analyzer) => {
          return (
            <>
              <Suspense fallback={"Loading ..."}>
                <AssignmentAnalyzer
                  analyzer_id={analyzer.id}
                  analyzer_name={analyzer.name}
                  assignment_id={Number(params.assignment_id)}
                />
              </Suspense>
            </>
          );
        })}
      </div>
    </>
  );
}
