import api from "@/api_utils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import { CreateButton } from "@/components/buttons";
import TeamOverview from "@/components/teamComponents/TeamOverview";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id), {
    cache: "no-cache",
  });
  const course_assignments = await api.getCourseAssignments(
    Number(params.course_id),
    { cache: "no-cache" },
  );

  const course_teams = await api.getCourseTeams(Number(params.course_id));

  return (
    <div className="ml-10 mt-10">
      <h2 className="h2 flex justify-center">
        Course {course_details.data.tag} - {course_details.data.name}
      </h2>
      {/* <CourseDetails id={course_details.data.id} /> */}
      <div className="flex w-full justify-between p-4 pt-1">
        <div className="max-w-50p grow p-4 text-center">
          <h2 className="h2">Assignments</h2>
          {course_assignments.data.map((assignment) => {
            return (
              <AssignmentOverview
                key={assignment.id}
                course_id={course_details.data.id}
                id={assignment.id}
                name={assignment.name}
                due_date={assignment.due_date}
              />
            );
          })}
          <CreateButton
            pushRoute={`/courses/${params.course_id}/assignments/new`}
            text={"Create Assignment"}
          />
        </div>
        <div className="max-w-50p grow p-4 text-center">
          <h2 className="h2">Teams</h2>
          {course_teams.data.map((team) => {
            return (
              <TeamOverview
                key={team.id}
                team_id={team.id}
                course_id={Number(params.course_id)}
              />
            );
          })}
          <CreateButton
            pushRoute={`/courses/${params.course_id}/teams/new`}
            text={"Add Team"}
          />
        </div>
      </div>
      <br />
    </div>
  );
}
