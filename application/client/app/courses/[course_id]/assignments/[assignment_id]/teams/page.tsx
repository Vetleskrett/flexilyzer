import api from "@/api_utils";

interface Props {
  params: { course_id: string; assignment_id: string };
}

export default async function AssignmentTeams({ params }: Props) {
  const teams = await api.getCourseTeams(Number(params.course_id));
  return (
    <>
      Implementere en funksjon som finner alle teams som har registrert noe for
      dette assignmentet?
    </>
  );
}
