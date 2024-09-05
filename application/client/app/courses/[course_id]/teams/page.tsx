"use client";
import api from "@/utils/apiUtils";
import CreateButton from "@/components/buttons/CreateButton";
import TeamOverview from "@/components/teamComponents/TeamOverview";
import { useSnackbar } from "@/context/snackbarContext";
import { useRouter } from "next/navigation";

interface Props {
  params: { course_id: string };
}

export default async function CourseTeamsPage({ params }: Props) {
  const course_details = await api.getCourse(Number(params.course_id));

  const course_teams = await api.getCourseTeams(Number(params.course_id));

  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  async function AddTeam() {
    const resp = await api.postTeam({course_id: Number(params.course_id)});
    if (resp.ok) {
      openSnackbar({
        message: "Analyzer submitted successfully!",
        severity: "success",
      });
      router.refresh();
    } else {
      openSnackbar({
        message: `Something wrong while submitting Analyzer: ${resp.error}`,
        severity: "warning",
      });
    }
  }

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
          onClickFunction={AddTeam}
          text={"Add Team"}
        />
      </div>
    </div>
  );
}
