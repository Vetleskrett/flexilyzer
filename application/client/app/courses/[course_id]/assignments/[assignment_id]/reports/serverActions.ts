// serverAction.ts
"use server";
import api from "@/utils/apiUtils";
import {
  AnalyzerOutputResponse,
  BatchStatsResponse,
  ReportResponse,
} from "@/extensions/data-contracts";

// Fetch the team batch report
export async function fetchTeamBatch(
  assignment_id: number,
  team_id: number,
  batch_id: number,
) {
  const resp = await api.getAssignmentProjectsReportsBatch(
    assignment_id,
    team_id,
    batch_id,
    { cache: "no-cache" },
  );
  if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
  return resp.data as ReportResponse;
}

// Fetch the analyzer outputs
export async function fetchAnalyzerOutputs(analyzer_id: number) {
  const resp = await api.getAnalyzerOutputs(analyzer_id, {
    cache: "no-cache",
  });
  if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
  return resp.data as AnalyzerOutputResponse[];
}

// Fetch the batch stats
export async function fetchBatchStats(batch_id: number) {
  const resp = await api.getBatchStats(batch_id);
  if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
  return resp.data as BatchStatsResponse;
}
