"use client";

import { useRouter } from "next/navigation";

export default async function NewBlogForm() {
  const { push } = useRouter();

  const postNewRepo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      githubLink: formData.get("githubLink"),
      homepageLink: formData.get("homepageLink"),
    };

    const res = await fetch("/api/repo", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (response.ok) {
      console.log("Repo was added successfully");
    } else {
      console.log("Something went wrong: ", response);
    }
  };

  return (
    <div>
      <form onSubmit={postNewRepo}>
        <label htmlFor="githubLink">Github Link</label>
        <input type="text" name="githubLink" defaultValue={""} />
        <label htmlFor="homepageLink">Homepage Link</label>
        <input type="text" name="homepageLink" defaultValue={""} />

        <button type="submit">Add repo!</button>
      </form>
    </div>
  );
}
