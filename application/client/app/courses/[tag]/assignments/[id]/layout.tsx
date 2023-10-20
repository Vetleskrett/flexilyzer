import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";

interface Props {
  params: { tag: string; id: string };
}

export default function AssignmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
}) {
  const assigment_details = {
    id: 1,
    course: 1,
    name: "Øving 3",
    due_date: "2023-12-20T23:59:00",
  };

  const teams = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  console.log(params);
  return (
    <>
      <AssignmentMetadata
        name={assigment_details.name}
        due_date={assigment_details.due_date}
      />
      <div className="flex">
        {" "}
        {/* Set up the horizontal layout */}
        {/* Sidebar */}
        <div className="flex flex-col p-4 border-r">
          {" "}
          <b className="mb-3">All teams:</b>
          {/* Set the width to 1/4 of the container and add padding and a right border */}
          {teams.map((team) => (
            <div key={team.id} className="mb-2">
              {" "}
              {/* Key for React and margin-bottom for spacing */}
              Team {team.id}
            </div>
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4">
          {" "}
          {/* flex-1 makes this div take up the remaining space */}
          {children}
        </div>
      </div>
    </>
  );
}
