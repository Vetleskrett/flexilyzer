"use client";
import { intComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function IntComponent({ avg, keyName, value }: intComponent) {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";
  return (
    <Card className="max-w-[600px] min-w-[200px] px-4">
      <CardHeader className="flex flex-row justify-center font-semibold">
        {keyName}
      </CardHeader>
      <CardBody className="text-small text-center pt-0">
        <div>{value}</div>

        {isCompareMode && avg ? <div>Avg: {avg.avg}</div> : ""}
      </CardBody>
    </Card>
  );
}
