"use client";

import { Button } from "@nextui-org/react";
// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreateButton({ route, text }: { route: string; text: string }) {
  const { push } = useRouter();

  return (
    <Button
      color="secondary"
      onClick={() => {
        push(route);
      }}
    >
      {text}
    </Button>
  );
}
