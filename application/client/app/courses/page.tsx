import CourseOverview from "@/components/courseComponents/CourseOverview";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default async function Courses() {
  const courses = [
    { id: 3, tag: "IT3010", name: "Webutviklling" },
    { id: 4, tag: "DCST1003" },
    { id: 5, tag: "INF3002", name: "Objektorientert programmering" },
  ];
  return (
    <div>
      <h2 className="h2">All courses:</h2>
      {courses.map((course) => {
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
