import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Api } from "@/extensions/Api";

export default async function Home() {
  const api = new Api();
  const g = api.getHelloTask();
  const query = { param: 10 };
  const p = api.postRunTask(query);
  return (
    <main className={styles.main}>
      Hello NTNU
      <div className={styles.buttons}>
        <Link href={"/courses"}>All courses</Link>
      </div>
    </main>
  );
}
