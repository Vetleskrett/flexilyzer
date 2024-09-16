"use server"
import api from "@/utils/apiUtils";
import { redirect } from "next/navigation";

export async function addAssignment(
    data: FormData,
    numberOfInputs: number,
    courseId: string) {

    const metadata = [];

    for(let i = 0; i < numberOfInputs; i++) {
        const keyName = data.get(`keyName${i}`) as string
        const valueType = data.get(`valueType${i}`) as string
  
        metadata.push({
          key_name: keyName,
          value_type: valueType,
        });
    }

    const name = data.get("name") as string
    const dueDate = data.get("dueDate") as string

    await api.createAssignment({
      course_id: Number(courseId),
      name: name,
      due_date: dueDate.substring(0, dueDate.toString().indexOf("[")), 
      metadata: metadata
    })
    redirect(`/courses/${courseId}`)

}