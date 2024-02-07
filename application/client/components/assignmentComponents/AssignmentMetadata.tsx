"use client";
import { AssignmentResponse } from "@/extensions/data-contracts";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface AssignmentDetails {
  name: string;
  due_date: string | undefined | null;
  assignment_id: number;
  course_id: number;
}
export default function AssignmentMetadata({
  name,
  due_date,
  assignment_id,
  course_id,
}: AssignmentDetails) {
  const router = useRouter();
  return (
    <Card className="mx-2 mt-2 p-0">
      <CardBody>
        <div className="flex flex-row justify-between items-center text-center">
          <div
            className="w-1/4 text-left cursor-pointer"
            onClick={() => {
              router.push(`/courses/${course_id}/assignments/${assignment_id}`);
            }}
          >
            <p>
              <b>{name}</b>
            </p>
          </div>

          <div className="w-1/2">
            <p className="text-lg">Assignment Reports</p>
          </div>

          <div className="w-1/4 text-right">
            <p>
              <b>Due date: </b>
              {due_date
                ? new Date(due_date).toLocaleDateString("no-NO")
                : "N/A"}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
