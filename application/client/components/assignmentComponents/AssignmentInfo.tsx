"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";

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
          <BackButton targetURL={`/courses/${course_id}`}/>
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
            <Tabs
              variant="underlined"
              selectedKey={segment}
              onSelectionChange={(e) => {
                router.push(
                  `/courses/${course_id}/assignments/${assignment_id}/${e}`
                );
              }}
            >
              <Tab key="reports" title="Reports"></Tab>
              <Tab key="overview" title="Overview"></Tab>
              <Tab key="details" title="Details"></Tab>
            </Tabs>
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
