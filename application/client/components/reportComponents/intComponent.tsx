"use client";
import { IntComponentT } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export const IntComponent = ({ avg, keyName, value }: IntComponentT) => {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";
  return (
    <Card className="min-w-[200px] max-w-[600px] px-4">
      <CardHeader className="flex flex-row justify-center pb-2 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="pt-2 text-center text-sm">
        <div>
          {value}
          {isCompareMode && avg && (
            <div className="text-gray-500"> (Avg: {avg.avg?.toFixed(0)})</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
