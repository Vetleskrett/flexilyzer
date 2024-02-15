"use client";
import { intComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function IntComponent({ avg, keyName, value }: intComponent) {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";
  return (
    <Card className="max-w-[600px] min-w-[200px] px-4">
      <CardHeader className="flex flex-row justify-center font-semibold pb-2">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="text-small text-center pt-2">
        <div>{value}{isCompareMode && avg && <div className="text-gray-500"> (Avg: {avg.avg?.toFixed(0)})</div>}</div>

        
      </CardBody>
    </Card>
  );
}
