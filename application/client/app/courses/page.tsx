import api from "@/utils/apiUtils";
import { CreateButton } from "@/components/buttons";
import CourseOverview from "@/components/courseComponents/CourseOverview";

import { CourseResponse } from "@/extensions/data-contracts";

export default async function Courses() {
  const courses = await api.getAllCourses({ cache: "no-cache" });

  return (
    <div>
      <h2 className='h2'>All courses:</h2>
      {courses.data.map((course: CourseResponse) => {
        return (
          <div key={course.id}>
            <CourseOverview course={course} />
          </div>
        );
      })}
      <div className='flex flex-col items-center'>
        <CreateButton pushRoute={"/courses/new"} text={"Create Course"} />
      </div>
    </div>
  );
}
