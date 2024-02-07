import api from "@/api_utils";
import AssignmentAnalyzer from "@/components/assignmentComponents/AssignmentAnalyzer";
import AssignmentDueDate from "@/components/assignmentComponents/AssignmentDueDate";
import ConnectAsssignmentAnalyzer from "@/components/assignmentComponents/ConnectAssignmentAnalyzer";
import { CreateButton } from "@/components/buttons";
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
      <div
        className='my-8 flex justify-center items-center text-center'
        style={{ position: "relative" }}
      >
        <h2 className="h2">Connected analyzers:</h2>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ConnectAsssignmentAnalyzer
            assigment_id={params.assignment_id}
            connected_analyzers={analyzers.data}
          />
        </div>
      </div>
      <div className='flex overflow-x-auto p-2 space-x-4'>
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
