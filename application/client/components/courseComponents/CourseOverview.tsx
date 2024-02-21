"use client";
import { CourseResponse } from "@/extensions/data-contracts";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CourseOverview({ course }: { course: CourseResponse }) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">
              {course.tag}
              {course.name ? ` - ${course.name}` : ""}
            </h3>
            Some more information about the course here ...
          </div>
          <div className="my-auto flex-initial">
            <Button
              color="primary"
              onClick={() => {
                router.push(`/courses/${course.id}`);
              }}
            >
              Go to course
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
