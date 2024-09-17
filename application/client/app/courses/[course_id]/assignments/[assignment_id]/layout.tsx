import { getCourse, getAssignment } from "@/utils/apiUtils";
import AssignmentInfo from "@/components/assignmentComponents/AssignmentInfo";

export default async function AssignmentOverviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: number;
    assignment_id: number;
  };
}) {
  const assignment_details = await getAssignment(params.assignment_id);

  const course = await getCourse(params.course_id);

  return (
    <>
      <div className="flex flex-row">
        <div className="grow">
          <AssignmentInfo
            left_text={`${assignment_details.name} (${course.tag}
    ${course.name && `- ${course.name}`})`}
            due_date={assignment_details.due_date}
            assignment_id={assignment_details.id}
            course_id={params.course_id}
          />
          {children}
        </div>
      </div>
    </>
  );
}
