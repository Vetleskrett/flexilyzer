"use client";
import { rangeComponent } from "@/types/componentDefinitions";
import { Progress } from "@nextui-org/react";

import { Card, CardBody } from "@nextui-org/react";

import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";

export default function RangeComponent({
  avg,
  keyName,
  value,
  fromValue,
  toValue,
}: rangeComponent) {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";

  return (
    <>
      <Card className="max-w-[500px] min-w-[400px] px-4">
        <CardBody className="">
          <Progress
            label={<p className="font-semibold">{keyName}</p>}
            aria-label={keyName}
            size="md"
            value={value}
            minValue={fromValue}
            maxValue={toValue}
            color={value / toValue > 0.65 ? "success" : "warning"}
            showValueLabel={true}
            className="max-w-md"
            valueLabel={
              <>
                {value} / {toValue}
                {isCompareMode && avg && <text className="text-gray-500"> (Avg: {avg.avg?.toFixed(0)})</text>}
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
}
