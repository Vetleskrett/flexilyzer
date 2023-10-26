"use client";
import { AssignmentResponse } from "@/extensions/data-contracts";
import { Card, CardBody } from "@nextui-org/react";

interface AssignmentDetails {
  name: string;
  due_date: string | undefined | null;
}
export default function AssignmentMetadata({
  name,
  due_date,
}: AssignmentDetails) {
  return (
    <Card className="mb-3 mt-2">
      <CardBody>
        <h2 className="h2">{name}</h2>
        <b>Due date: </b>
        {due_date ? new Date(due_date).toLocaleDateString("no-NO") : "N/A"}
      </CardBody>
    </Card>
  );
}
