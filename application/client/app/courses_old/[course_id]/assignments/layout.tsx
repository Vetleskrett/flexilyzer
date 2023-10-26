"use client";
import { useEffect } from "react"; // Import useEffect
import { Api } from "@/extensions/Api";
import { TeamProvider, useTeam } from "./providers"; // Import useTeam

export default function AssignmentsLayout({
  // Change to non-async function
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    course_id: string;
  };
}) {
 
  return (
    <>
      <TeamProvider>{children}</TeamProvider>
    </>
  );
}
