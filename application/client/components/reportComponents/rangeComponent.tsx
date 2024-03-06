"use client";
import { RangeComponentT } from "@/types/componentDefinitions";
import { Progress } from "@nextui-org/react";

import { Card, CardBody } from "@nextui-org/react";

import { useSearchParams } from "next/navigation";
import { TooltipWrapper } from "../tableComponents/renderCell";

export const RangeComponent = ({
  keyName,
  value,
  fromValue,
  toValue,
  avg,
  desc,
}: RangeComponentT) => {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";

  return (
    <Card className="min-w-[400px] max-w-[500px] px-4">
      <CardBody className="">
        <TooltipWrapper desc={desc}>
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
              <div className="text-sm">
                {value} / {toValue}
                {isCompareMode && avg && (
                  <text className="text-gray-500">
                    {" "}
                    (Avg: {avg.avg?.toFixed(0)})
                  </text>
                )}
              </div>
            }
          />
        </TooltipWrapper>
      </CardBody>
    </Card>
  );
};
