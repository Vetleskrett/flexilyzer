"use client";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { DateComponentT } from "@/types/componentDefinitions";

const defaultDateFormat = "EE dd. MMM' 'HH:mm";

export const DateComponent = ({ keyName, value }: DateComponentT) => {
  return (
    <Card className="w-[250px] px-4">
      <CardHeader className="flex flex-row justify-center pb-1 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center justify-center gap-2 pt-2">
        {format(new Date(value), defaultDateFormat, {
          locale: enGB,
        })}
      </CardBody>
    </Card>
  );
};
