"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function TeamOverview({
  team_id,
  course_id,
}: {
  team_id: number;
  course_id: number;
}) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">Team {team_id}</h3>
            More info here ? ...
          </div>
          <div className="my-auto flex-initial">
            <Button
              onClick={() => {
                router.push(`/courses/${course_id}/teams/${team_id}`);
              }}
              color="primary"
            >
              Go to Team
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
