import api from "@/utils/apiUtils";
import CreateButton from "@/components/buttons/CreateButton";
import CourseOverview from "@/components/courseComponents/CourseOverview";

import { CourseResponse } from "@/extensions/data-contracts";

export default async function Courses() {
  const courses = await api.getAllCourses({ cache: "no-cache" });

  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row justify-between">
        <h2 className="h2">All courses:</h2>
        <CreateButton pushRoute={"/courses/new"} text={"Create Course"} />
      </div>
      {courses.data.map((course: CourseResponse) => {
        return (
          <div key={course.id}>
            <CourseOverview course={course} />
          </div>
        );
      })}
    </div>
  );
}
