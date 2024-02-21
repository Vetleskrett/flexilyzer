interface Props {
  params: { course_id: string; assignment_id: string };
}

export default async function AssignmentTeams({ params: _params }: Props) {
  return (
    <>
      Implementere en funksjon som finner alle teams som har registrert noe for
      dette assignmentet?
    </>
  );
}
