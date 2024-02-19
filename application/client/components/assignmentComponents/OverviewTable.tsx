"use client";
import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { AnalyzerWithOutputs, TeamReports } from "@/types/analyzerDefinitions";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Progress,
  Tooltip,
} from "@nextui-org/react";

interface OverviewTableParams {
  analyzersWithOutputs: AnalyzerWithOutputs[];
  allReports: TeamReports;
}

type FlatMappedOutputs = {
  analyzerId: number;
  key_name: string;
  value_type: ValueTypesOutput;
  display_name?: string | null | undefined;
  extended_metadata?: null | undefined;
  id: number;
};

export default function OverviewTable({
  allReports,
  analyzersWithOutputs,
}: OverviewTableParams) {
  console.log(allReports);
  console.log(analyzersWithOutputs);

  // Creating a new array with flatMapped outputs from all analyzers
  let flatMappedOutputs: FlatMappedOutputs[] = analyzersWithOutputs.flatMap(
    (analyzer) =>
      analyzer.outputs.map((output) => {
        return {
          ...output,
          analyzerId: analyzer.id,
        };
      })
  );

  flatMappedOutputs = flatMappedOutputs.filter(
    (output) => output.key_name !== "test_coverage"
  );

  const columnHeaders = [
    <TableColumn key="team">Team</TableColumn>,
    ...flatMappedOutputs.map((output) => (
      <TableColumn key={output.id}>
        {output.display_name ? output.display_name : output.key_name}
      </TableColumn>
    )),
  ];

  console.log(columnHeaders);

  // Pre-define the rows
  const rows = Object.entries(allReports).map(([teamId, teamData]) => {
    const cells = [
      <TableCell key={`team-${teamId}`}>{teamId}</TableCell>,
      ...flatMappedOutputs.map((output) => {
        // Find the corresponding report for the current output's analyzerId
        const report = teamData.reports.find(
          (r: ReportTeamResponse) => r.analyzer_id === output.analyzerId
        );
        // Attempt to find the value in the report using the key_name
        const value = report ? report.report[output.key_name] : undefined;
        console.log(value);
        switch (output.value_type) {
          case ValueTypesOutput.Range:
            interface RangeMetadata {
              fromRange: number;
              toRange: number;
            }

            const extendedMetadata =
              output.extended_metadata as unknown as RangeMetadata;

            return (
              <TableCell>
                {value && (
                  <Tooltip
                    delay={0}
                    closeDelay={0}
                    content={
                      <>
                        {value} / {extendedMetadata.toRange}
                      </>
                    }
                  >
                    <Progress
                      aria-label={output.key_name}
                      size="md"
                      value={value}
                      minValue={extendedMetadata.fromRange}
                      maxValue={extendedMetadata.toRange}
                      color={
                        value / extendedMetadata.toRange > 0.65
                          ? "success"
                          : "warning"
                      }
                      className="max-w-md"
                    />
                  </Tooltip>
                )}
              </TableCell>
            );
          case ValueTypesOutput.Str:
            return <TableCell>{value}</TableCell>;
          case ValueTypesOutput.Bool:
            return (
              <TableCell>
                {value !== undefined && (
                  <Chip
                    size="sm"
                    variant="solid"
                    color={(value as boolean) ? "success" : "danger"}
                    className="text-white"
                  >
                    {value ? "Yes" : "No"}
                  </Chip>
                )}
              </TableCell>
            );
          case ValueTypesOutput.Int:
            return <TableCell>{value}</TableCell>;
          default:
            return <TableCell>N/A</TableCell>;
          // return (
          //   <TableCell key={`${teamId}-${output.analyzerId}-${output.key_name}`}>
          //     {value || ""}
          //   </TableCell>
          // );
        }
      }),
    ];

    return <TableRow key={teamId}>{cells}</TableRow>;
  });

  return (
    <>
      <Table>
        <TableHeader>{columnHeaders}</TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    </>
  );
}
