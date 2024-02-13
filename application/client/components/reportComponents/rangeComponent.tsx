"use client";
import { rangeComponent } from "@/types/componentDefinitions";
import { Progress } from "@nextui-org/react";

import { Card, CardBody } from "@nextui-org/react";

import { Button } from "@nextui-org/button";

export default function RangeComponent({
  keyName,
  value,
  fromValue,
  toValue,
}: rangeComponent) {
  return (
    <>
      <Card className="max-w-[500px]">
        <CardBody>
          <Progress
            label={keyName}
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
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
}
