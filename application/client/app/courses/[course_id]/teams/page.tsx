import api from "@/api_utils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import { CreateButton } from "@/components/buttons";
import CourseDetails from "@/components/courseComponents/CourseDetails";
import TeamOverview from "@/components/teamComponents/TeamOverview";

interface Props {
  params: { course_id: string };
}

export default async function CourseTeamsPage({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id));

  const course_teams = await api.getCourseTeams(Number(params.course_id));

  return (
    <div className="mt-10 ml-10">
      <h2 className="h2 flex justify-center">
        Teams for Course {course_details.data.tag} - {course_details.data.name}
      </h2>
      {/* <CourseDetails id={course_details.data.id} /> */}

      {course_teams.data.map((team) => {
        return (
          <TeamOverview
            team_id={team.id}
            course_id={Number(params.course_id)}
          />
        );
      })}
      <div className="flex justify-center">
        <CreateButton
          pushRoute={`/courses/${params.course_id}/teams/new`}
          text={"Add Team"}
        />
      </div>
    </div>
  );
}
