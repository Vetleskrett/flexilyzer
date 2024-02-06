"use client";

import { BatchReponse } from "@/extensions/data-contracts";
import { calcTimeDifference } from "@/utils/timeUtils";
import { Card } from "@nextui-org/react";
import Dot from "../DotComponent";
import AnalyzerBatchInfo from "../analyzerComponents/AnalyzerBatchInfo";
import api from "@/api_utils";
import { useRouter } from "next/navigation";

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

  const assignment_analyzers_batches = await api.getAssignmentAnalyzersBatches(
    assignment_id,
    analyzer_id,
    { cache: "no-cache" }
  );

  return (
    <>
      <Card
        className="overflow-y-auto bg-slate-100"
        style={{  minWidth: "400px", height: "400px" }}
      >
        <h3
          className="h3 text-center mt-3 text-blue-500 cursor-pointer"
          onClick={() => {
            router.push(`/analyzers/${analyzer_id}`);
          }}
        >
          {analyzer_name}
        </h3>
        {assignment_analyzers_batches.data
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
          .map((batch) => {
            return <AnalyzerBatchInfo batch={batch} />;
          })}
      </Card>
    </>
  );
}
