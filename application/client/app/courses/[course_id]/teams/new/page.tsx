"use client"
import api from "@/utils/apiUtils";
import { Input } from "@nextui-org/react";
import CreateButton from "@/components/buttons/CreateButton";
import BackButton from "@/components/buttons/BackButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { course_id: string };
}

export default function NewTeamPage({ params: _params }: Props) {

  const router = useRouter();
  const [numberOfTeams, setNumberOfTeams] = useState(1);
    async function addTeam() {
      if (numberOfTeams < 2){
        await api.postTeam({course_id: Number(_params.course_id)});
      }
      else{
        await api.postTeams(Number(_params.course_id), numberOfTeams);
      }
      router.push(`/courses/${_params.course_id}`)
      router.refresh();
    }
  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={`/courses/${_params.course_id}`} buttonText={`Course ${_params.course_id}`} />
        <h2 className="h2">Add new teams</h2>
        <Input
          type="number"
          label="Number of teams"
          onValueChange={(value => setNumberOfTeams(Number(value)))}
        />
        <CreateButton
          onClickFunction={addTeam}
          text={"Submit Teams"}
        />
      </div>
    </>
  );
}
