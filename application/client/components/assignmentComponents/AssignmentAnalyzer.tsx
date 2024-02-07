"use client";

import { BatchResponse, JobCreate } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Button, Card, Skeleton } from "@nextui-org/react";
import Dot from "../DotComponent";
import AnalyzerBatchInfo from "../analyzerComponents/AnalyzerBatchInfo";
import api from "@/api_utils";
import { usePathname, useRouter } from "next/navigation";
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
  const pathName = usePathname();

  const fetchBatches = async () => {
    const resp = await api.getAssignmentAnalyzersBatches(
      assignment_id,
      analyzer_id,
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
    ["batches", { assignment_id, analyzer_id }],
    fetchBatches,
    {
      refetchOnWindowFocus: false,
    }
  );

  const runAnalyzerMutation = useMutation(
    async () => {
      const payload: JobCreate = { assignment_id: assignment_id };
      return await api.runJob(analyzer_id, payload);
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
        // Optionally, refetch queries here if needed
      },
      onError: (error: any) => {
        openSnackbar({
          message: "Something wrong while starting Analyzer job",
          severity: "error",
        });
        console.error(error);
      },
    }
  );

  return (
    <>
      <Card className='h-[500px] w-[350px] p-2 bg-slate-100 shadow-sm'>
        <h3
          className='h3 text-center mt-3 text-blue-500 cursor-pointer'
          onClick={() => {
            router.push(`/analyzers/${analyzer_id}`);
          }}
        >
          {analyzer_name}
        </h3>
        <div className='flex flex-row justify-center gap-2 ml-5 mr-5 h-[50px]'>
          <Button
            color='secondary'
            onClick={() => runAnalyzerMutation.mutate()}
            className='w-[100px]'
          >
            Run analyzer
          </Button>
          <Button
            onClick={() => {
              queryClient.invalidateQueries([
                "batches",
                { assignment_id, analyzer_id },
              ]);
            }}
            className='w-[100px]'
          >
            Refresh
          </Button>
          <Button
            color='primary'
            onClick={() => {
              router.push(pathName + `/reports?analyzer=${analyzer_id}`);
            }}
            className='w-[100px]'
          >
            Reports
          </Button>
        </div>
        <div className='overflow-y-auto mt-2'>
          {error ? (
            <div>An error occurred: {error.message}</div>
          ) : isBatchesLoading ? (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className='rounded-lg my-2 bg-white'>
                  <Card className='h-[50px] flex items-center justify-center shadow-sm'></Card>
                </Skeleton>
              ))}
            </>
          ) : (
            batches &&
            batches
              .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
              .map((batch, i) => {
                return (
                  <>
                    <div key={i} className='my-2'>
                      {" "}
                      <AnalyzerBatchInfo batch={batch} />
                    </div>
                  </>
                );
              })
          )}
        </div>
      </Card>
    </>
  );
}
