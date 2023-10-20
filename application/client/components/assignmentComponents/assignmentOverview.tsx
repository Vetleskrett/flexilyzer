"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface AssignmentProps {
  course_id: number;
  assignment_id: number;
  name: string;
  due_date: string;
}

export default function AssignmentOverview({
  course_id,
  assignment_id,
  name,
  due_date,
}: AssignmentProps) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">{name}</h3>
            <b>Due Date: </b>
            {new Date(due_date).toLocaleDateString("no-NO")}
          </div>
          <div className="flex-initial my-auto mr-15">
            <Button
              onClick={() => {
                router.push(
                  `/courses/${course_id}/assignments/${assignment_id}`
                );
              }}
              variant="faded"
            >
              Go to Assignment
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
