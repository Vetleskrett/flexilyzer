"use client";
import api from "@/utils/apiUtils";
import {
  AnalyzerOutputResponse,
  BatchStatsResponse,
  ReportResponse,
} from "@/extensions/data-contracts";
import { renderMetrics } from "@/components/reportComponents/renderReportMetrics";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default function TeamReportsPage({ params }: Props) {
  const searchParams = useSearchParams();

  const team_id = searchParams.get("team_id");
  const batch_id = searchParams.get("batch");
  const analyzer_id = searchParams.get("analyzer");
  const isCompareMode = searchParams.get("compare") === "true";

  // Define the fetch function
  const fetchTeamBatch = async () => {
    const resp = await api.getAssignmentProjectsReportsBatch(
      params.assignment_id,
      Number(team_id),
      Number(batch_id),
      { cache: "no-cache" }
    );
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  // Define the fetch function
  const fetchAnalyzerOutputs = async () => {
    const resp = await api.getAnalyzerOutputs(Number(analyzer_id), {
      cache: "no-cache",
    });
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  // Define the fetch function
  const fetchBatchStats = async () => {
    const resp = await api.getBatchStats(Number(batch_id));
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  // Use useQuery hook to fetch data
  const {
    data: report,
    isLoading: isLoadingReport,
    error: errorReport,
  } = useQuery<ReportResponse, Error>(
    ["teamBatches", { team_id, batch_id }],
    fetchTeamBatch,
    {
      refetchOnWindowFocus: false,
      // Only proceed with the query if team_id is not null
      enabled: !!team_id && !!batch_id,
      retry: false,
    }
  );

  const {
    data: analyzerOutputs,
    isLoading: isLoadingAnalyzer,
    error: errorAnalyzer,
  } = useQuery<AnalyzerOutputResponse[], Error>(
    ["analyzerOutputs", { analyzer_id }],
    fetchAnalyzerOutputs,
    {
      refetchOnWindowFocus: false,
      // Only proceed with the query if team_id is not null
      enabled: !!team_id && !!batch_id,
      retry: false,
    }
  );

  const {
    data: batchStats,
    isLoading: isLoadingStats,
    error: errorStats,
  } = useQuery<BatchStatsResponse, Error>(
    ["batchStats", { batch_id }],
    fetchBatchStats,
    {
      refetchOnWindowFocus: false,
      // Only proceed with the query if team_id is not null
      enabled: isCompareMode,
      retry: false,
      staleTime: Infinity,
    }
  );

  if (!team_id) {
    return (
      <div className="mt-14 text-center">
        Select a team to show report data.
      </div>
    );
  }

  if (isLoadingReport || isLoadingAnalyzer || isLoadingStats) {
    <div>Report is loading ...</div>;
  }

  if (errorReport || errorAnalyzer || errorStats) {
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

// Fetch all batches for assignment and specific analyzer
