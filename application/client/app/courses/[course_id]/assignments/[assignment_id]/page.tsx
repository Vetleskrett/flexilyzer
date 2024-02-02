import api from "@/api_utils";
import AnalyzerBatchInfo from "@/components/analyzerComponents/AnalyzerBatchInfo";
import AssignmentDueDate from "@/components/assignmentComponents/AssignmentDueDate";
import { calcTimeDifference } from "@/utils/timeUtils";

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

  const assignment_analyzers_batches = await api.getAssignmentAnalyzersBatches(
    Number(params.assignment_id),
    Number(params.course_id),
    { cache: "no-cache" }
  );

  const analyzers = await api.getAllAnalyzers();

  return (
    <>
      <h2 className="h2 flex justify-center">
        {assignment.data.name} ({course.data.tag}{" "}
        {course.data.name ? <>- {course.data.name}</> : ""})
      </h2>
      <div className="flex justify-center">
        <AssignmentDueDate
          assignment_id={assignment.data.id}
          due_date={
            assignment.data.due_date ? assignment.data.due_date : undefined
          }
        />
      </div>
      <h2 className="h2 mt-8 flex justify-center">Connected analyzers:</h2>
      {assignment_analyzers_batches.data.map((batch) => {
        return (
          <>
            <AnalyzerBatchInfo batch={batch} />
          </>
        );
      })}
    </>
  );
}
