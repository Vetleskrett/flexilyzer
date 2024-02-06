interface Props {
  params: { course_id: string; assignment_id: string };
}

export default async function ConnectAnalyzerAssignmentPage({ params }: Props) {
  return (
    <>
      <h2 className="h2">
        Connect Assignment with ID {params.assignment_id} to a new Analyzer
      </h2>
      Not yet implemented...
    </>
  );
}
