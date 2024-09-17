import { getCourse, getCourseAssignments } from "@/utils/apiUtils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";

interface Props {
  params: { course_id: string };
}

export default async function CourseAssignments({ params }: Props) {
  const course_details = await getCourse(Number(params.course_id));

  const course_assignments = await getCourseAssignments(
    Number(params.course_id),
  );

  return (
    <div className="">
      <h2 className="h2">
        Course {course_details.tag} - {course_details.name}
      </h2>

      <br />
      {course_assignments.map((assignment) => (
        <AssignmentOverview
          key={assignment.id}
          course_id={course_details.id}
          id={assignment.id}
          name={assignment.name}
          due_date={assignment.due_date}
        />
      ))}
    </div>
  );
}
