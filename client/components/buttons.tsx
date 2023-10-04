'use client'

// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export function CreateButton({ slug }: any) {
  const { push } = useRouter();

  return (
    <button
      onClick={() => {
        push(`/blog/${slug}`);
      }}
    >
      Read post
    </button>
  );
}
