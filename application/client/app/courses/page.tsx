import CourseOverview from "@/components/courseComponents/CourseOverview";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

import { Api } from "@/extensions/Api";
import { CourseResponse } from "@/extensions/data-contracts";

export default async function Courses() {
  // const courses = [
  //   { id: 3, tag: "IT3010", name: "Webutviklling" },
  //   { id: 4, tag: "DCST1003" },
  //   { id: 5, tag: "INF3002", name: "Objektorientert programmering" },
  // ];

  const api = new Api({ baseUrl: "http://127.0.0.1:8000" });

  const courses = await api.getAllCourses();
  return (
    <div>
      <h2 className='h2'>All courses:</h2>
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
    </div>
  );
}
