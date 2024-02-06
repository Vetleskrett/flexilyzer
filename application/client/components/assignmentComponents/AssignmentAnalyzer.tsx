"use client";

import { BatchReponse, JobCreate } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Button, Card } from "@nextui-org/react";
import Dot from "../DotComponent";
import AnalyzerBatchInfo from "../analyzerComponents/AnalyzerBatchInfo";
import api from "@/api_utils";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
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
    isLoading,
  } = useQuery<BatchReponse[], Error>(
    ["batches", { assignment_id, analyzer_id }],
    fetchBatches,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  async function runAnalyzer() {
    const payload: JobCreate = { assignment_id: assignment_id };
    const resp = await api.runJob(analyzer_id, payload);
    console.log(resp);
    if (resp.ok) {
      openSnackbar({
        message: "Analyzer job started successfully!",
        severity: "success",
      });
      queryClient.invalidateQueries([
        "batches",
        { assignment_id, analyzer_id },
      ]);
      // re-fetch here to get the newly created batch data
    } else {
      openSnackbar({
        message: `Something wrong while starting Analyzer job: ${resp.error}`,
        severity: "warning",
      });
    }
  }
  return (
    <>
      <Card className="h-[300px] w-[350px] p-2 bg-slate-100">
        <h3
          className="h3 text-center mt-3 text-blue-500 cursor-pointer"
          onClick={() => {
            router.push(`/analyzers/${analyzer_id}`);
          }}
        >
          {analyzer_name}
        </h3>
        <div className="flex flex-row justify-center gap-2 ml-5 mr-5 h-[50px]">
          <Button color="primary" onClick={runAnalyzer} className="w-[100px]">
            Run analyzer
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              queryClient.invalidateQueries([
                "batches",
                { assignment_id, analyzer_id },
              ]);
            }}
            className="w-[100px]"
          >
            Refresh
          </Button>
        </div>
        <div className="overflow-y-auto">
          {batches &&
            batches
              .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
              .map((batch, i) => {
                return (
                  <>
                    <div key={i} className="my-2">
                      {" "}
                      <AnalyzerBatchInfo batch={batch} />
                    </div>
                  </>
                );
              })}
        </div>
      </Card>
    </>
  );
}
