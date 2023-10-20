"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface CourseProps {
  id: number;
  tag: string;
  name?: string;
}

export default function CourseOverview({ id, tag, name }: CourseProps) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">
              {tag}
              {name ? ` - ${name}` : ""}
            </h3>
            Some more information about the course here ...
          </div>
          <div className="flex-initial my-auto mr-15">
            <Button
              onClick={() => {
                router.push(`/courses/${id}`);
              }}
              variant="faded"
            >
              Go to course
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
