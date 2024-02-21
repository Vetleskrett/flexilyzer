"use client";

import { calcTimeDifference } from "@/utils/timeUtils";
import { Card } from "@nextui-org/react";
import { format } from "date-fns";

const dateTimeFormat = "yyyy-MM-dd HH:mm";

interface Params {
  assignment_id: number;
  due_date: string | undefined;
}
export default function AssignmentDueDate({
  assignment_id: _assignment_id,
  due_date,
}: Params) {
  return (
    <>
      <Card className="max-w-md p-5 ">
        {due_date ? (
          <>
            Due date: {format(new Date(due_date), dateTimeFormat)} (
            {calcTimeDifference(due_date)})
          </>
        ) : (
          "No Due date set"
        )}
      </Card>
    </>
  );
}
