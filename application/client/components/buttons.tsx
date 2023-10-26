"use client";

import { Button } from "@nextui-org/react";
// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreateCourseButton() {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => {
        push(`/courses/new`);
      }}
    >
      Create course
    </Button>
  );
}
