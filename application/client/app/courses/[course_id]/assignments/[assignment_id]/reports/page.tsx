"use client";
import api from "@/api_utils";
import AnalyzerTabs from "@/components/reportPageComponents/AnalyzerTabs";
import { ReportResponse } from "@/extensions/data-contracts";
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

  // Define the fetch function
  const fetchTeamBatches = async () => {
    const resp = await api.getAssignmentProjectsReportsBatch(
      params.assignment_id,
      Number(team_id),
      Number(batch_id),
      { cache: "no-cache" }
    );
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  // Use useQuery hook to fetch data
  const {
    data: report,
    isLoading,
    error,
  } = useQuery<ReportResponse, Error>(
    ["teamBatches", { team_id, batch_id }],
    fetchTeamBatches,
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

  if (isLoading) {
    <div>Report is loading ...</div>;
  }

  if (error) {
    return <div>An error occurred while trying to fetch report.</div>;
  }

  return <>{report?.id}</>;
}

// Fetch all batches for assignment and specific analyzer
