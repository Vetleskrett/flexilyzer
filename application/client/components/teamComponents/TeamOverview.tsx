"use client";
import { Card, CardBody } from "@nextui-org/react";

export default function TeamOverview({
  team_id,
}: {
  team_id: number;
  course_id: number;
}) {
  return (
    <Card className="mb-5">
      <CardBody className="flex flex-col justify-center py-3">
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">Team {team_id}</h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
