"use client";
import { boolComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

export default function BoolComponent({ keyName, value }: boolComponent) {
  return (
    <Card>
      <CardBody>
        <div className='flex flex-row'>
          <div>{keyName}</div>
          <div>
            <Chip variant='bordered' color={value ? "success" : "danger"}>
              {value ? "Yes" : "No"}
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
