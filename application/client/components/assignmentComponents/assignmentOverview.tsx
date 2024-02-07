"use client";
import { AssignmentResponse } from "@/extensions/data-contracts";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface AssignmentOverview extends AssignmentResponse {
  course_id: number;
}

export default function AssignmentOverview({
  course_id,
  id,
  name,
  due_date,
}: AssignmentOverview) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">{name}</h3>
            <b>Due Date: </b>
            {due_date ? new Date(due_date).toLocaleDateString("no-NO") : ""}
          </div>
          <div className="flex-initial my-auto mr-15">
            <Button
              onClick={() => {
                router.push(`/courses/${course_id}/assignments/${id}`);
              }}
              color="primary"
            >
              Go to Assignment
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
