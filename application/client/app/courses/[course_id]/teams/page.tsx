import api from "@/utils/apiUtils";
import CreateButton from "@/components/buttons/CreateButton";
import TeamOverview from "@/components/teamComponents/TeamOverview";

interface Props {
  params: { course_id: string };
}

export default async function CourseTeamsPage({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id));

  const course_teams = await api.getCourseTeams(Number(params.course_id));

  return (
    <div className="ml-10 mt-10">
      <h2 className="h2 flex justify-center">
        Teams for Course {course_details.data.tag} - {course_details.data.name}
      </h2>

      {course_teams.data.map((team) => (
        <TeamOverview
          key={team.id}
          team_id={team.id}
          course_id={Number(params.course_id)}
        />
      ))}
      <div className="flex justify-center">
        <CreateButton
          pushRoute={`/courses/${params.course_id}/teams/new`}
          text={"Add Team"}
        />
      </div>
    </div>
  );
}
