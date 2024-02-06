"use client";

import { BatchReponse, JobCreate } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Button, Card } from "@nextui-org/react";
import Dot from "../DotComponent";
import AnalyzerBatchInfo from "../analyzerComponents/AnalyzerBatchInfo";
import api from "@/api_utils";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

interface AssignmentAnalyzerProps {
  analyzer_id: number;
  analyzer_name: string;
  assignment_id: number;
}
export default async function AssignmentAnalyzer({
  analyzer_id,
  analyzer_name,
  assignment_id,
}: AssignmentAnalyzerProps) {
  const router = useRouter();

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
  } = useQuery<BatchReponse[], Error>("batches", fetchBatches);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  async function runAnalyzer() {
    const payload: JobCreate = { assignment_id: assignment_id };
    const resp = await api.runJob(analyzer_id, payload);
    console.log(resp);
  }
  return (
    <>
      <Card
        className="overflow-y-auto bg-slate-100"
        style={{ minWidth: "400px", height: "400px" }}
      >
        <h3
          className="h3 text-center mt-3 text-blue-500 cursor-pointer"
          onClick={() => {
            router.push(`/analyzers/${analyzer_id}`);
          }}
        >
          {analyzer_name}
        </h3>
        <Button color="primary" onClick={runAnalyzer}>
          Run analyzer
        </Button>
        {batches &&
          batches
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .map((batch) => {
              return <AnalyzerBatchInfo batch={batch} />;
            })}
      </Card>
    </>
  );
}
