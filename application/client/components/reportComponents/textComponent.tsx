"use client";
import { TextComponentT } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export const TextComponent = ({ keyName, value }: TextComponentT) => {
  return (
    <Card className="min-w-[200px] max-w-[600px] px-4">
      <CardHeader className="flex flex-row justify-center pb-2 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="pt-2 text-center text-sm">{value}</CardBody>
    </Card>
  );
};
