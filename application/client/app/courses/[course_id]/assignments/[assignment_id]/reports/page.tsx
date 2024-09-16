"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { LoadingComponent } from "@/components/LoadingComponent";
import { renderMetrics } from "@/components/reportComponents/renderReportMetrics";
import {
  fetchTeamBatch,
  fetchAnalyzerOutputs,
  fetchBatchStats,
} from "./serverActions";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default function TeamReportsPage({ params }: Props) {
  const searchParams = useSearchParams();

  const team_id = searchParams.get("team_id");
  const batch_id = searchParams.get("batch");
  const analyzer_id = searchParams.get("analyzer");
  const isCompareMode = searchParams.get("compare") === "true";

  // Fetch Team Batch
  const {
    data: report,
    isLoading: isLoadingReport,
    error: errorReport,
  } = useQuery(
    ["teamBatches", { team_id, batch_id }],
    () =>
      fetchTeamBatch(params.assignment_id, Number(team_id), Number(batch_id)),
    {
      refetchOnWindowFocus: false,
      enabled: !!team_id && !!batch_id,
      retry: false,
    },
  );

  // Fetch Analyzer Outputs
  const {
    data: analyzerOutputs,
    isLoading: isLoadingAnalyzer,
    error: errorAnalyzer,
  } = useQuery(
    ["analyzerOutputs", { analyzer_id }],
    () => fetchAnalyzerOutputs(Number(analyzer_id)),
    {
      refetchOnWindowFocus: false,
      enabled: !!analyzer_id && !!batch_id,
      retry: false,
    },
  );

  // Fetch Batch Stats
  const { data: batchStats, isLoading: isLoadingStats } = useQuery(
    ["batchStats", { batch_id }],
    () => fetchBatchStats(Number(batch_id)),
    {
      refetchOnWindowFocus: false,
      enabled: isCompareMode,
      retry: false,
      staleTime: Infinity,
    },
  );

  if (isLoadingReport || isLoadingAnalyzer || isLoadingStats) {
    return <LoadingComponent text={"Report is loading ..."} />;
  }

  if (errorReport || errorAnalyzer) {
    return (
      <div className="mt-14 text-center">
        An error occurred while trying to fetch report.
      </div>
    );
  }

  return (
    <div className="m-8 flex flex-row flex-wrap gap-6">
      {report &&
        analyzerOutputs &&
        renderMetrics(report, analyzerOutputs, batchStats)}
    </div>
  );
}
