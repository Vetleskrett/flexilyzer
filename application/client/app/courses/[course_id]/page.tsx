import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import { Api } from "@/extensions/Api";
import Link from "next/link";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const api = new Api({ baseUrl: "http://localhost:8000" });

  console.log(params.course_id);

  const course_details = await api.getCourse(Number(params.course_id));
  const course_assignments = [
    {
      id: 1,
      course: 1,
      name: "Øving 3",
      due_date: "2023-12-20T23:59:00",
    },
  ];

  const ca = await api.getCourseAssignments(Number(params.course_id));

  return (
    <div className="">
      <h2 className="h2">
        Course {course_details.data.tag} - {course_details.data.name}
      </h2>

      <br />
      {course_assignments.map((assignment) => {
        return (
          <AssignmentOverview
            course_id={course_details.data.id}
            assignment_id={assignment.id}
            name={assignment.name}
            due_date={assignment.due_date}
          />
        );
      })}
    </div>
  );
}
