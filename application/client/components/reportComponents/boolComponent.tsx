"use client";
import { boolComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function BoolComponent({
  keyName,
  value,
  distribution,
}: boolComponent) {
  const searchParams = useSearchParams();

  const isCompareMode = searchParams.get("compare") === "true";

  return (
    <Card className="w-[200px] px-4">
      <CardHeader className="flex flex-row justify-center pb-1 font-semibold">
        {keyName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center justify-center gap-2 pt-2">
        <Chip
          size="sm"
          variant="solid"
          color={value ? "success" : "danger"}
          className="text-white"
        >
          {value ? "Yes" : "No"}
        </Chip>
        {isCompareMode && distribution && (
          <>
            <div className="flex flex-row gap-2">
              <Chip size="sm" variant="bordered" color={"success"}>
                {distribution.true.toPrecision(2)} %
              </Chip>
              <Chip size="sm" variant="bordered" color={"danger"}>
                {distribution.false.toPrecision(2)} %
              </Chip>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
