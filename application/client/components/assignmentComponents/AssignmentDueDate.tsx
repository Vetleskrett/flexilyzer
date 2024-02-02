"use client";

import { calcTimeDifference } from "@/utils/timeUtils";
import { Card } from "@nextui-org/react";
import { format } from "date-fns";
import { useState } from "react";

const dateTimeFormat = "yyyy-MM-dd HH:mm";

interface Params {
  assignment_id: number;
  due_date: string | undefined;
}
export default function AssignmentDueDate({ assignment_id, due_date }: Params) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    due_date ? new Date(due_date) : undefined
  );

  return (
    <>
      <Card className="py-5 px-5 max-w-md ">
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
