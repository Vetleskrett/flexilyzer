"use client";

import { Input } from "@nextui-org/react";
import CreateButton from "@/components/buttons/CreateButton";
import BackButton from "@/components/buttons/BackButton";
import { redirect } from "next/navigation";
import { postTeam, postTeams } from "@/utils/apiUtils";

interface Props {
  params: { course_id: string };
}

export default function NewTeamPage({ params: _params }: Props) {

  async function submit(data: FormData) {

    const numberOfTeams = Number(data.get("numberOfTeams") as string);

    if (numberOfTeams < 2){
        await postTeam({course_id: Number(_params.course_id)});
    }
    else{
        await postTeams(Number(_params.course_id), numberOfTeams);
    }

    redirect(`/courses/${_params.course_id}`)
  }
  
  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={`/courses/${_params.course_id}`} buttonText={`Course ${_params.course_id}`} />
        <h2 className="h2">Add new teams</h2>
        <form action={submit}>
          <Input
            type="number"
            name="numberOfTeams"
            label="Number of teams"
          />
          <CreateButton
            text={"Submit Teams"}
          />
        </form>
      </div>
    </>
  );
}
