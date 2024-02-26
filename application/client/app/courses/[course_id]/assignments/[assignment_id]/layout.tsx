import api from "@/utils/apiUtils";
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
  const assignment_details = await api.getAssignment(params.assignment_id);

  const course = await api.getCourse(params.course_id, {
    cache: "no-cache",
  });

  return (
    <>
      <div className='flex flex-row'>
        <div className='grow'>
          <AssignmentInfo
            left_text={`${assignment_details.data.name} (${course.data.tag}
    ${course.data.name && `- ${course.data.name}`})`}
            due_date={assignment_details.data.due_date}
            assignment_id={assignment_details.data.id}
            course_id={params.course_id}
          />
          {children}
        </div>
      </div>
    </>
  );
}
