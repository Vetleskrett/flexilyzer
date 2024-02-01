import api from "@/api_utils";
import AssignmentDueDate from "@/components/assignmentComponents/AssignmentDueDate";

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
  return (
    <>
      <h2 className="h2 flex justify-center">
        {assignment.data.name} ({course.data.tag}{" "}
        {course.data.name ? <>- {course.data.name}</> : ""})
      </h2>

      <AssignmentDueDate
        assignment_id={assignment.data.id}
        due_date={
          assignment.data.due_date ? assignment.data.due_date : undefined
        }
      />
    </>
  );
}
