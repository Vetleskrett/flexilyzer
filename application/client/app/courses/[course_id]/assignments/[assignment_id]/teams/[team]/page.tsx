interface Props {
  params: { course_id: string; assignment_id: string; team: string };
}

export default function TeamAssignmentPage({ params }: Props) {
  return <>Team page for {params.team}</>;
}
