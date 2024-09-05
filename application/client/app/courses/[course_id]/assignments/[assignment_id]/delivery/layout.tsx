import AssignmentSideBar from "@/components/assignmentComponents/SideBar";

export default async function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: number;
    assignment_id: number;
  };
}) {
  return (
    <>
      <div className="flex flex-row">
        {/* Sidebar */}
        <AssignmentSideBar
          course_id={params.course_id}
          assignment_id={params.assignment_id}
        />
        <div className="grow">
          {children}
        </div>
      </div>
    </>
  );
}
