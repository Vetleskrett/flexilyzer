import { getAssignmentAnalyzers, getAnalyzerOutputs, getAssignmentAnalyzersBatchesLatestReports } from "@/utils/apiUtils";
import OverViewTable from "@/components/tableComponents/Table";
import { AnalyzerWithOutputs, TeamReports } from "@/types/analyzerDefinitions";
import { NoReportData } from "@/components/NoReportData";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default async function AssignmentOverviewPage({ params }: Props) {
  const analyzersWithOutputs: AnalyzerWithOutputs[] = [];
  const allReports: TeamReports = {};

  const analyzersResponse = await getAssignmentAnalyzers(params.assignment_id);

  for (const analyzer of analyzersResponse) {
    const analyzerOutputsResponse = await getAnalyzerOutputs(analyzer.id);
    analyzersWithOutputs.push({
      id: analyzer.id,
      analyzer_name: analyzer.name,
      outputs: analyzerOutputsResponse,
    });

    const reportsResponse =
      await getAssignmentAnalyzersBatchesLatestReports(
        params.assignment_id,
        analyzer.id,
      );

      if (reportsResponse) {
        for (const report of reportsResponse) {
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
  return (
    <div>
      {Object.entries(allReports).length > 0 ? (
        <OverViewTable
          analyzersWithOutputs={analyzersWithOutputs}
          allReports={allReports}
        />
      ) : (
        <NoReportData />
      )}
    </div>
  );
}
