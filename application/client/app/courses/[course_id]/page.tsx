import { getCourse, getCourseAssignments, getCourseTeams} from "@/utils/apiUtils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import CreateButton from "@/components/buttons/CreateButton";
import TeamOverview from "@/components/teamComponents/TeamOverview";
import BackButton from "@/components/buttons/BackButton";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const course_details = await getCourse(Number(params.course_id));
  const course_assignments = await getCourseAssignments(
    Number(params.course_id));

  const course_teams = await getCourseTeams(Number(params.course_id));

  return (
    <div className="ml-10 mt-10">
      <div className="flex flex-row items-center justify-between">
        <BackButton targetURL={"/courses"} buttonText="Courses" />
        <h2 className="h2 mx-4 grow text-center">
          Course {course_details.tag} - {course_details.name}
        </h2>
      </div>
      <div className="flex w-full justify-between p-4 pt-1">
        <div className="max-w-50p grow p-4">
          <div className="mx-2 mb-2 flex flex-row justify-between">
            <h2 className="h2">Assignments</h2>
            <CreateButton
              pushRoute={`/courses/${params.course_id}/assignments/new`}
              text={"Create Assignment"}
            />
          </div>
          {course_assignments.map((assignment) => (
            <AssignmentOverview
              key={assignment.id}
              course_id={course_details.id}
              id={assignment.id}
              name={assignment.name}
              due_date={assignment.due_date}
            />
          ))}
        </div>
        <div className="max-w-50p grow p-4">
          <div className="mx-2 mb-2 flex flex-row justify-between">
            <h2 className="h2">Teams</h2>
            <CreateButton
              pushRoute={`/courses/${params.course_id}/teams/new`}
              text={"Add Team"}
            />
          </div>
          {course_teams.map((team) => (
            <TeamOverview
              key={team.id}
              team_id={team.id}
              course_id={Number(params.course_id)}
            />
          ))}
        </div>
      </div>
      <br />
    </div>
  );
}
