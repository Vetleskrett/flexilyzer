import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  return (
    <main className={styles.main}>
      Hello NTNU
      <div className={styles.buttons}>
        <Link href={"/courses"}>All courses</Link>
      </div>
    </main>
  );
}
