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
      <Card className="h-[30px] flex flex-row justify-between items-center px-3 mx-2 shadow-sm text-sm">
        <Tooltip
          placement={"right"}
          delay={0}
          closeDelay={0}
          content={"Universal Batch ID"}
        >
          <div>{batch.id}</div>
        </Tooltip>
        <Tooltip
          placement="right"
          delay={0}
          closeDelay={0}
          content={format(new Date(batch.timestamp), "PP HH:mm:ss")}
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
              <Tooltip
                placement={"right"}
                delay={0}
                closeDelay={0}
                content={batch.status}
              >
                <div>
                  <Dot color={STATUS_COLOR_MAPPING[batch.status]} size={10} />
                  {/* <p className="ml-2">{batch.status}</p> */}
                </div>
              </Tooltip>
            </>
          ) : (
            "Unknown status"
          )}
        </div>
      </Card>
    </>
  );
}
