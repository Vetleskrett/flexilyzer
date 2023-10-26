import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import { Api } from "@/extensions/Api";
import Link from "next/link";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });

  const course_details = await api.getCourse(Number(params.course_id));

  const course_assignments = await api.getCourseAssignments(
    Number(params.course_id)
  );

  return (
    <div className="">
      <h2 className="h2">
        Course {course_details.data.tag} - {course_details.data.name}
      </h2>

      <br />
      {course_assignments.data.map((assignment) => {
        return (
          <AssignmentOverview
            course_id={course_details.data.id}
            id={assignment.id}
            name={assignment.name}
            due_date={assignment.due_date}
          />
        );
      })}
    </div>
  );
}
