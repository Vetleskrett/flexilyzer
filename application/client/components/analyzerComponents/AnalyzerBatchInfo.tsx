"use client";

import { BatchResponse } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Card, Tooltip } from "@nextui-org/react";
import { format, formatDistance } from "date-fns";
import Dot from "../DotComponent";

const STATUS_COLOR_MAPPING = {
  STARTED: "#0BB7DA",
  RUNNING: "#73F61E",
  FAILED: "#FD5A13",
  FINISHED: "#069224",
};
export default function AnalyzerBatchInfo({ batch }: { batch: BatchResponse }) {
  return (
    <>
      <Card className="h-[50px] flex flex-row justify-between items-center px-3 mx-2 shadow-sm text-sm">
        <div>ID: {batch.id}</div>
        <Tooltip
          delay={0}
          closeDelay={0}
          content={format(new Date(batch.timestamp), "PPPP HH:mm:ss")}
        >
          <div>
            <>
              {formatDistance(new Date(batch.timestamp), new Date(), {
                addSuffix: true,
              })}
            </>
          </div>
        </Tooltip>
        <div className="flex flex-row items-center">
          {batch.status ? (
            <>
              <Dot color={STATUS_COLOR_MAPPING[batch.status]} size={10} />
              <p className="ml-2">{batch.status}</p>
            </>
          ) : (
            "Unknown status"
          )}
        </div>
      </Card>
    </>
  );
}
