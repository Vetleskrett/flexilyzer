import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";

export default async function RepoPage() {
  const repos = await prisma.repository.findMany();

  return (
    <main>
      <h3>All repos:</h3>
      {repos.map((repo) => {
        return (
          <>
            <Link href={`/repo/${repo.id}`}>{repo.id}</Link>
          </>
        );
      })}
      <h3>Add new repo:</h3>
      
    </main>

  );
}
