"use client";

import { BatchResponse, JobCreate } from "@/extensions/data-contracts";
import { Button, Card, Skeleton } from "@nextui-org/react";
import AnalyzerBatchInfo from "../analyzerComponents/AnalyzerBatchInfo";
import { getAssignmentAnalyzersBatches, runJob } from "@/utils/apiUtils";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useSnackbar } from "@/context/snackbarContext";

interface AssignmentAnalyzerProps {
  analyzer_id: number;
  analyzer_name: string;
  assignment_id: number;
}
export default function AssignmentAnalyzer({
  analyzer_id,
  analyzer_name,
  assignment_id,
}: AssignmentAnalyzerProps) {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    data: batches,
    error,
    isLoading: isBatchesLoading,
  } = useQuery<BatchResponse[], Error>(
    ["batches", { assignment_id, analyzer_id }],
    () => getAssignmentAnalyzersBatches(assignment_id, analyzer_id),
    {
      refetchOnWindowFocus: false,
    },
  );

  const runAnalyzerMutation = useMutation(
    async () => {
      const payload: JobCreate = { assignment_id: assignment_id };
      return await runJob(analyzer_id, payload);
    },
    {
      onSuccess: () => {
        openSnackbar({
          message: "Analyzer job started successfully!",
          severity: "success",
        });
        queryClient.invalidateQueries([
          "batches",
          { assignment_id, analyzer_id },
        ]);
      },
      onError: (error: Error) => {
        openSnackbar({
          message: "Something wrong while starting Analyzer job",
          severity: "error",
        });
        console.error(error.message);
      },
    },
  );

  return (
    <>
      <Card className="h-[500px] min-w-[300px] bg-slate-100 p-2 shadow-sm">
        <h3
          className="h3 mt-3 cursor-pointer text-center text-blue-500"
          onClick={() => {
            router.push(`/analyzers/${analyzer_id}`);
          }}
        >
          {analyzer_name}
        </h3>
        <div className="mx-5 flex h-[30px] flex-row justify-center gap-5">
          <Button
            size="sm"
            color="secondary"
            onClick={() => runAnalyzerMutation.mutate()}
            className="w-[80px]"
          >
            Run
          </Button>
          <Button
            size="sm"
            onClick={() => {
              queryClient.invalidateQueries([
                "batches",
                { assignment_id, analyzer_id },
              ]);
            }}
            className="w-[80px]"
          >
            Refresh
          </Button>
        </div>
        <div className="mt-2 overflow-y-auto">
          {error ? (
            <div>An error occurred: {error.message}</div>
          ) : isBatchesLoading ? (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="my-2 rounded-lg bg-white">
                  <Card
                    key={index}
                    className="flex h-[50px] items-center justify-center shadow-sm"
                  ></Card>
                </Skeleton>
              ))}
            </>
          ) : (
            batches &&
            batches
              .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
              .map((batch, i) => {
                return (
                  <div key={i} className="my-2">
                    {" "}
                    <AnalyzerBatchInfo batch={batch} />
                  </div>
                );
              })
          )}
        </div>
      </Card>
    </>
  );
}
