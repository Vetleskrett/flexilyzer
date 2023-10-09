import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const courses = await prisma.course.findMany();

  return (
    <main className={styles.main}>
      Hello NTNU
      <div>
        <h2>All courses:</h2>
        {courses.map((course) => {
          return (
            <>
              <Link href={`/fag/${course.tag}`}>
                {" "}
                {course.tag} - {course.name}
              </Link>
            </>
          );
        })}
      </div>
    </main>
  );
}
