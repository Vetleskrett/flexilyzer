import { CreateCourseButton } from "@/components/buttons";
import CourseOverview from "@/components/courseComponents/CourseOverview";

import { Api } from "@/extensions/Api";
import { CourseResponse } from "@/extensions/data-contracts";

export default async function Courses() {
  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });

  const courses = await api.getAllCourses();
  return (
    <div>
      <h2 className="h2">All courses:</h2>
      {courses.data.map((course: CourseResponse) => {
        return (
          <>
            <CourseOverview
              id={course.id}
              tag={course.tag}
              name={course.name}
            />
          </>
        );
      })}
      <div className="flex flex-col items-center mt-30">
        <CreateCourseButton />
      </div>
    </div>
  );
}
