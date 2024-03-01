import api from "@/utils/apiUtils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";

interface Props {
  params: { course_id: string };
}

export default async function CourseAssignments({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id));

  const course_assignments = await api.getCourseAssignments(
    Number(params.course_id),
  );

  return (
    <div className="">
      <h2 className="h2">
        Course {course_details.data.tag} - {course_details.data.name}
      </h2>

      <br />
      {course_assignments.data.map((assignment) => (
        <AssignmentOverview
          key={assignment.id}
          course_id={course_details.data.id}
          id={assignment.id}
          name={assignment.name}
          due_date={assignment.due_date}
        />
      ))}
    </div>
  );
}
