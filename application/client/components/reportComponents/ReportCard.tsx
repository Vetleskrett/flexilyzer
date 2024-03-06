"use client";

import { ReportComponentT } from "@/types/componentDefinitions";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export const ReportCard = ({
  keyName,
  children,
  avgValue,
}: ReportComponentT) => {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";

  return (
    <Card className=" px-4">
      <CardHeader className="flex flex-row justify-center pb-2 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center justify-around pt-2 text-sm">
        {children}
        {isCompareMode &&
          avgValue &&
          (typeof avgValue === "string" ? (
            <div className="text-xs text-gray-500"> (Avg: {avgValue})</div>
          ) : (
            avgValue
          ))}
      </CardBody>
    </Card>
  );
};
