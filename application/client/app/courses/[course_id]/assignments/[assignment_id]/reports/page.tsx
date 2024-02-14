"use client";
import api from "@/api_utils";
import AnalyzerTabs from "@/components/reportPageComponents/AnalyzerTabs";
import {
  AnalyzerOutputResponse,
  ReportResponse,
} from "@/extensions/data-contracts";
import { renderMetrics } from "@/utils/renderReportMetrics";
import { useSearchParams } from "next/navigation";
import { cache } from "react";
import { useQuery } from "react-query";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default function TeamReportsPage({ params }: Props) {
  const searchParams = useSearchParams();

  const team_id = searchParams.get("team_id");
  const batch_id = searchParams.get("batch");
  const analyzer_id = searchParams.get("analyzer");

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

  if (!team_id || !batch_id) {
    return (
      <div>
        Missing one or more of the following parameters: team ID, batch. Please
        specify both to show report data.
      </div>
    );
  }

  if (isLoadingReport || isLoadingAnalyzer) {
    <div>Report is loading ...</div>;
  }

  if (errorReport || errorAnalyzer) {
    return <div>An error occurred while trying to fetch report.</div>;
  }

  return (
    <div className='m-8 flex flex-row flex-wrap gap-6'>
      {report && analyzerOutputs && renderMetrics(report, analyzerOutputs)}
    </div>
  );
}

// Fetch all batches for assignment and specific analyzer
