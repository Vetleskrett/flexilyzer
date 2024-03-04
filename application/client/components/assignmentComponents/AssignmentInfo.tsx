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
    <Card className="mx-2 mt-2 h-14">
      <CardBody className="flex flex-col justify-center marker:py-0">
        <div className="flex flex-row items-center justify-between text-center">
          <div
            className="flex w-1/3 cursor-pointer flex-row items-center text-left"
            onClick={() => {
              router.push(`/courses/${course_id}/assignments/${assignment_id}`);
            }}
          >
            <BackButton targetURL={`/courses/${course_id}`} />
            <p className="text-sm font-bold">{left_text}</p>
          </div>

          <div className="w-1/3">
            <Tabs
              variant="underlined"
              selectedKey={segment}
              onSelectionChange={(e) => {
                router.push(
                  `/courses/${course_id}/assignments/${assignment_id}/${e}`,
                );
              }}
            >
              <Tab className="w-[75px]" key="reports" title="Reports"></Tab>
              <Tab className="w-[75px]" key="overview" title="Overview"></Tab>
              <Tab className="w-[75px]" key="details" title="Details"></Tab>
            </Tabs>
          </div>

          <div className="w-1/3 text-right">
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
