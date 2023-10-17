"use client";
import { rangeComponent } from "@/app/types/componentDefinitions";
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
      <Card>
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
          />
        </CardBody>
      </Card>
    </>
  );
}
