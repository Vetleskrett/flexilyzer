import styles from "./page.module.css";
import Link from "next/link";

interface Props {
  params: { tag: string };
}

export default async function CourseHomePage({ params }: Props) {
  const course_assignments = [
    {
      id: 1,
      course: 1,
      name: "Øving 3",
      due_date: "2023-12-20T23:59:00",
    },
  ];

  return (
    <main className={styles.main}>
      <h2>Start page for {params.tag}</h2>

      <br />
      <div className="">
        {course_assignments.map((assignment) => {
          return (
            <>
              {" "}
              <Link href={`/assignments/${assignment.id}`}>
                {" "}
                {assignment.name}
              </Link>
            </>
          );
        })}
      </div>
    </main>
  );
}
