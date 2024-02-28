"use client";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { DateComponentT } from "@/types/componentDefinitions";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { useSearchParams } from "next/navigation";

export const DateComponent = ({ avg, keyName, value }: DateComponentT) => {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";
  return (
    <Card className="w-[300px] px-4">
      <CardHeader className="flex flex-row justify-center pb-1 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center justify-center gap-2 pt-2">
        {standardTimeFormatter(new Date(value))}
        {isCompareMode && avg?.avg && (
          <div className="text-gray-500">
            (Avg: {standardTimeFormatter(new Date(avg.avg))})
          </div>
        )}
      </CardBody>
    </Card>
  );
};
