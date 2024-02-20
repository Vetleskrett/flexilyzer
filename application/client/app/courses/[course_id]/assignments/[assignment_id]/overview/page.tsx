import api from "@/api_utils";
import OverviewTable from "@/components/assignmentComponents/OverviewTable";
import {
  AnalyzerOutputResponse,
  ReportResponse,
  ReportTeamResponse,
} from "@/extensions/data-contracts";
import { AnalyzerWithOutputs, TeamReports } from "@/types/analyzerDefinitions";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default async function AssignmentOverviewPage({ params }: Props) {
  const analyzersWithOutputs: AnalyzerWithOutputs[] = [];
  const allReports: TeamReports = {};

  const analyzersResponse = await api.getAssignmentAnalyzers(
    params.assignment_id,
    {
      cache: "no-cache",
    }
  );

  if (analyzersResponse.ok) {
    for (const analyzer of analyzersResponse.data) {
      const analyzerOutputsResponse = await api.getAnalyzerOutputs(analyzer.id);
      if (analyzerOutputsResponse.status === 200) {
        analyzersWithOutputs.push({
          id: analyzer.id,
          analyzer_name: analyzer.name,
          outputs: analyzerOutputsResponse.data,
        });
      }

      const reportsResponse =
        await api.getAssignmentAnalyzersBatchesLatestReports(
          params.assignment_id,
          analyzer.id
        );
      if (reportsResponse.status === 200) {
        for (const report of reportsResponse.data) {
          if (allReports[report.team_id]) {
            allReports[report.team_id].reports.push(report);
          } else {
            allReports[report.team_id] = {
              reports: [report],
            };
          }
        }
      }
    }
  }
  return (
    <div className='flex flex-row justify-center'>
      <OverviewTable
        analyzersWithOutputs={analyzersWithOutputs}
        allReports={allReports}
      />
    </div>
  );
}
