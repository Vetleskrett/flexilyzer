"use client";
import { boolComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

export default function BoolComponent({ keyName, value }: boolComponent) {
  return (
    <Card className="w-[200px] px-4">
      <CardHeader className="flex flex-row justify-center font-semibold">
        {keyName}
      </CardHeader>
      <CardBody className="flex flex-row justify-center pt-0">
        <Chip size="sm" variant="bordered" color={value ? "success" : "danger"}>
          {value ? "Yes" : "No"}
        </Chip>
      </CardBody>
    </Card>
  );
}
