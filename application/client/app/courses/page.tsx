import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const courses = [{ id: 3, tag_name: "IT3010 Webutvikling" }];
  return (
    <main className={styles.main}>
      Hello NTNU
      <div>
        <h2>All courses:</h2>
        {courses.map((course) => {
          return (
            <>
              <Link href={`/courses/${course.id}`}> {course.tag_name}</Link>
            </>
          );
        })}
      </div>
    </main>
  );
}
