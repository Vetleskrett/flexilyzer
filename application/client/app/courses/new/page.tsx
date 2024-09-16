"use client";

import { Input } from "@nextui-org/react";
import BackButton from "@/components/buttons/BackButton";
import CreateButton from "@/components/buttons/CreateButton";
import { redirect } from "next/navigation";
import { addCourse } from "./serverActions"

export default function NewCoursePage() {

  async function submit(data: FormData) {  
    await addCourse(data);
  
    redirect("/courses");
  }

  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={"/courses"} buttonText="Courses" />
        <h2 className="h2">Create new course</h2>

        <form action={submit} className="g-4">
          <Input
            className="mt-4"
            type="string"
            label="Course tag"
            name="tag"
            defaultValue={"course"}
          />
          <Input
            className="mt-4"
            type="string"
            label="Course Name"
            name="name"
          />
          <CreateButton
            text={"Submit Course"}
          />
        </form>
      </div>
    </>
  );
}
