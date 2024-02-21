"use client";
import { textComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function TextComponent({ keyName, value }: textComponent) {
  return (
    <Card className="min-w-[200px] max-w-[600px] px-4">
      <CardHeader className="flex flex-row justify-center pb-2 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="pt-2 text-center text-small">{value}</CardBody>
    </Card>
  );
}
