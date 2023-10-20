"use client";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface AssignmentMetadataProps {
  name: string;
  due_date: string;
}

export default function AssignmentMetadata({
  name,
  due_date,
}: AssignmentMetadataProps) {
  return (
    <Card className="mb-3 mt-2">
      <CardBody>
        <h2 className="h2">{name}</h2>
        <b>Due date: </b>
        {new Date(due_date).toLocaleDateString("no-NO")}
      </CardBody>
    </Card>
  );
}
