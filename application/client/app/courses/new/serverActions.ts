"use server";

import api from "@/utils/apiUtils";

export async function addCourse(data: FormData) { 
  const tag = data.get("tag") as string;
  const name = data.get("name") as string;

  await api.postCourse({ tag, name });
}