"use client";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelectedLayoutSegment } from "next/navigation";

interface AssignmentDetails {
  left_text: string;
  due_date: string | undefined | null;
  assignment_id: number;
  course_id: number;
}
export default function AssignmentInfo({
  left_text,
  due_date,
  assignment_id,
  course_id,
}: AssignmentDetails) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  return (
    <Card className="mx-2 mt-2 p-0">
      <CardBody>
        <div className="flex flex-row items-center justify-between text-center">
          <div
            className="w-1/4 cursor-pointer text-left"
            onClick={() => {
              router.push(`/courses/${course_id}/assignments/${assignment_id}`);
            }}
          >
            <p>
              <b>{left_text}</b>
            </p>
          </div>

          <div className="w-1/2">
            <p className="text-lg">
              {segment ? (
                <>Assignment {segment[0].toUpperCase() + segment.slice(1)}</>
              ) : (
                "Assignment page"
              )}
            </p>
          </div>

          <div className="w-1/4 text-right">
            <p>
              <b>Due: </b>
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
