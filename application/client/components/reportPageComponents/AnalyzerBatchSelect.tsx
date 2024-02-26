"use client";

import api from "@/api_utils";
import { BatchResponse } from "@/extensions/data-contracts";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function AnalyzerBatchSelect({
  assignment_id,
}: {
  assignment_id: number;
}) {
  const pathname = usePathname();
  const [selectedBatch, setSelectedBatch] = useState<string | undefined>(
    undefined
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentAnalyzerId = searchParams.get("analyzer");
  const currentBatchId = searchParams.get("batch");

  const fetchBatches = async () => {
    const resp = await api.getAssignmentAnalyzersBatches(
      assignment_id,
      Number(currentAnalyzerId),
      { cache: "no-cache" }
    );
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  const {
    data: batches,
    error,
    isLoading: isBatchesLoading,
  } = useQuery<BatchResponse[], Error>(
    ["batches", { assignment_id, currentAnalyzerId }],
    fetchBatches,
    {
      refetchOnWindowFocus: false,
    }
  );

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

  console.log(selectedBatch);

  return (
    <>
      {error ? (
        <div>An error occurred: {error.message}</div>
      ) : isBatchesLoading ? (
        <>
          <Spinner />
        </>
      ) : batches && batches.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="text-center">
          There are no available batches for this analyzer.
        </div>
      )}
    </>
  );
}
