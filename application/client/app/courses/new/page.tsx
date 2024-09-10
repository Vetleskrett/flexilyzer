"use client"
import api from "@/utils/apiUtils";
import { Input } from "@nextui-org/react";
import CreateButton from "@/components/buttons/CreateButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";

export default function NewCoursePage() {

    const router = useRouter();

    const [tag, setTag] = useState<string>("")
    const [name, setName] = useState<string>("")

     async function addCourse() {
      await api.postCourse({tag: tag, name: name})
      router.push(`/courses`)
      router.refresh();
    }
  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={"/courses"} buttonText="Courses" />
        <h2 className="h2">Create new course</h2>
        <Input
          type="string"
          label="Course tag"
          defaultValue={"course"}
          onValueChange={(value => setTag(value))}
        />
        <Input
          type="string"
          label="Course Name"
          onValueChange={(value => setName(value))}
        />
        <CreateButton
          onClickFunction={addCourse}
          text={"Submit Course"}
        />
      </div>
    </>
  );
}