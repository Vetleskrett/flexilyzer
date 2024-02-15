"use client";
import { boolComponent } from "@/types/componentDefinitions";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
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
      <CardHeader className="flex flex-row justify-center font-semibold">
        {keyName}
      </CardHeader>
      <CardBody className="flex flex-col justify-center gap-4 items-center pt-0">
        <Chip size="sm" variant="bordered" color={value ? "success" : "danger"}>
          {value ? "Yes" : "No"}
        </Chip>
        {isCompareMode && distribution && (
          <>
            <div className="flex flex-row gap-2">
              <Chip size="sm" variant="bordered" color={"success"}>
                {distribution.true} %
              </Chip>
              <Chip size="sm" variant="bordered" color={"danger"}>
                {distribution.false} %
              </Chip>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
