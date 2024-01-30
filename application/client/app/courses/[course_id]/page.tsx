import api from "@/api_utils";
import AssignmentOverview from "@/components/assignmentComponents/assignmentOverview";
import CourseDetails from "@/components/courseComponents/CourseDetails";

interface Props {
  params: { course_id: string };
}

export default async function CourseHomePage({ params }: Props) {

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
