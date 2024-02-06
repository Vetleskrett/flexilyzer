"use client";

import { BatchReponse } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Card } from "@nextui-org/react";
import Dot from "../DotComponent";

const STATUS_COLOR_MAPPING = {
  STARTED: "#0BB7DA",
  RUNNING: "#73F61E",
  FAILED: "#FD5A13",
  FINISHED: "#069224",
};
export default function AnalyzerBatchInfo({ batch }: { batch: BatchReponse }) {
  return (
    <>
      <Card className="h-[50px] flex items-center justify-center">
          <p className="flex items-center justify-center gap-2 text-sm">
            Batch: {batch.id} Run: {calcTimeDifference(batch.timestamp)} |
            {batch.status ? (
              <>
                <Dot color={STATUS_COLOR_MAPPING[batch.status]} size={10} />
                {batch.status}
              </>
            ) : (
              "Unknown status"
            )}
          </p>
      </Card>
    </>
  );
}
