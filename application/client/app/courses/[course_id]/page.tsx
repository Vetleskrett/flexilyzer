import api from "@/utils/apiUtils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import CreateButton from "@/components/buttons/CreateButton";
import TeamOverview from "@/components/teamComponents/TeamOverview";
import BackButton from "@/components/buttons/BackButton";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id), {
    cache: "no-cache",
  });
  const course_assignments = await api.getCourseAssignments(
    Number(params.course_id),
    { cache: "no-cache" }
  );

  const course_teams = await api.getCourseTeams(Number(params.course_id));

  return (
    <div className='ml-10 mt-10'>
      <div className='flex flex-row justify-between items-center'>
        <BackButton targetURL={"/courses"} buttonText='Courses' />
        <h2 className='h2 flex-grow text-center mx-4'>
          Course {course_details.data.tag} - {course_details.data.name}
        </h2>
      </div>
      <div className='flex w-full justify-between p-4 pt-1'>
        <div className='max-w-50p grow p-4 text-center'>
          <h2 className='h2'>Assignments</h2>
          {course_assignments.data.map((assignment) => (
            <AssignmentOverview
              key={assignment.id}
              course_id={course_details.data.id}
              id={assignment.id}
              name={assignment.name}
              due_date={assignment.due_date}
            />
          ))}
          <CreateButton
            pushRoute={`/courses/${params.course_id}/assignments/new`}
            text={"Create Assignment"}
          />
        </div>
        <div className='max-w-50p grow p-4 text-center'>
          <h2 className='h2'>Teams</h2>
          {course_teams.data.map((team) => (
            <TeamOverview
              key={team.id}
              team_id={team.id}
              course_id={Number(params.course_id)}
            />
          ))}
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
