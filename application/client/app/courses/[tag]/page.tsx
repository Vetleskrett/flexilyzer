import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import Link from "next/link";

interface Props {
  params: { tag: string };
}

export default async function CourseHomePage({ params }: Props) {

  const course_details = {
    id: 3,
    tag: "IT3010",
    name: "Webutvikling",
  };
  const course_assignments = [
    {
      id: 1,
      course: 1,
      name: "Øving 3",
      due_date: "2023-12-20T23:59:00",
    },
  ];

  return (
    <div className="">
      <h2 className="h2">Course {course_details.tag}</h2>

      <br />
      {course_assignments.map((assignment) => {
        return (
          <AssignmentOverview
            course_id={course_details.id}
            assignment_id={assignment.id}
            name={assignment.name}
            due_date={assignment.due_date}
          />
        );
      })}
    </div>
  );
}
