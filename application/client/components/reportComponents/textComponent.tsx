"use client";
import { textComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function TextComponent({ keyName, value }: textComponent) {
  return (
    <Card className='max-w-[600px] min-w-[200px] px-4'>
      <CardHeader className='h3 flex flex-row justify-center'>
        {keyName}
      </CardHeader>
      <CardBody>{value}</CardBody>
    </Card>
  );
}
