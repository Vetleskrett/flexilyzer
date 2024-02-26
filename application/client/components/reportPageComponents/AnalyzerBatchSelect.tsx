"use client";

import api from "@/utils/apiUtils";
import { BatchResponse } from "@/extensions/data-contracts";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function AnalyzerBatchSelect({
  batches,
}: {
  batches: BatchResponse[];
}) {
  const pathname = usePathname();
  const [selectedBatch, setSelectedBatch] = useState<string | undefined>(
    undefined
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentAnalyzerId = searchParams.get("analyzer");
  const currentBatchId = searchParams.get("batch");

  useEffect(() => {
    if (currentBatchId) {
      setSelectedBatch(currentBatchId);
    } else {
      setSelectedBatch(undefined);
    }
  }, [currentAnalyzerId, currentBatchId]);

  const handleSelectionChange = (key: string) => {
    // Update the URL with the new search parameters
    router.push(pathname + "?" + createQueryString("batch", key));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
      <Select
        disallowEmptySelection={true}
        size="sm"
        label="Selected batch"
        placeholder="Select a batch"
        selectedKeys={selectedBatch ? [selectedBatch] : selectedBatch}
        onChange={(e) => {
          if (e.target.value !== "") {
            handleSelectionChange(e.target.value);
          }
        }}
        aria-label="batch-select"
      >
        {batches
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
          .map((batch) => (
            <SelectItem
              key={batch.id}
              value={batch.id}
              textValue={format(new Date(batch.timestamp), "PP HH:mm:ss")}
            >
              <>{format(new Date(batch.timestamp), "PP HH:mm:ss")}</>
            </SelectItem>
          ))}
      </Select>
  );
}
