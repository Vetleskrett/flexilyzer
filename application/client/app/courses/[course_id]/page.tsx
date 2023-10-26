import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import CourseDetails from "@/components/courseComponents/CourseDetails";
import { Api } from "@/extensions/Api";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {
  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });

  const course_details = await api.getCourse(Number(params.course_id));

  return (
    <div className="mt-10 ml-10">
      <h2 className="h2">
        Course {course_details.data.tag} - {course_details.data.name}
      </h2>
      <CourseDetails id={course_details.data.id} />
      <br />
    </div>
  );
}
