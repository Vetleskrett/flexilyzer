"use client";
import { textComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function TextComponent({ keyName, value }: textComponent) {
  return (
    <Card>
      <CardHeader>{keyName}</CardHeader>
      <CardBody>{value}</CardBody>
    </Card>
  );
}
