import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

interface Props {
  params: { tag: string };
}

export default async function CourseHomePage({ params }: Props) {
  const courseInfo = await prisma.course.findFirst({
    where: { tag: params.tag },
  });

  return (
    <main className={styles.main}>
      <h2>
        Start page for {courseInfo?.tag} - {courseInfo?.name}
      </h2>
    </main>
  );
}
