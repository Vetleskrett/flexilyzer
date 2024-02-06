"use client";

import { Button } from "@nextui-org/react";
// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreateButton({
  pushRoute,
  text,
  onClickFunction,
}: {
  pushRoute?: string;
  text: string;
  onClickFunction?: () => void;
}) {
  const { push } = useRouter();

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    } else if (pushRoute) {
      push(pushRoute);
    }
  };

  return (
    <Button color='secondary' onClick={handleClick}>
      {text}
    </Button>
  );
}
