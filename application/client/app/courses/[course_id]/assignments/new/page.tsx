"use client"
import api from "@/utils/apiUtils";
import { Input, DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import CreateButton from "@/components/buttons/CreateButton";
import BackButton from "@/components/buttons/BackButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { course_id: string };
}

export default function NewAssignment({ params: _params }: Props) {
    const router = useRouter();
    const [dueDate, setDueDate] = useState(now(getLocalTimeZone()))
    const [name, setName] = useState<string>("Assignment")

     async function addAssignment() {
      console.log(dueDate.toString())
      await api.createAssignmentApiV1AssignmentsPost({
        course_id: Number(_params.course_id),
        name: name,
        due_date: dueDate.toString().substring(0, dueDate.toString().indexOf("[")), 
      })
      router.push(`/courses/${_params.course_id}`)
      router.refresh();
    }
  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={`/courses/${_params.course_id}`} buttonText={`Course ${_params.course_id}`} />
        <h2 className="h2">Create new course</h2>
        <Input
          type="string"
          label="Assignment name"
          value={name}
          onValueChange={(value => setName(value))}
        />
        <DatePicker
          label="Due date"
          value={dueDate}
          hideTimeZone
          onChange={setDueDate}
        />
        <CreateButton
          onClickFunction={addAssignment}
          text={"Add Assignment"}
        />
      </div>
    </>
  );
}
