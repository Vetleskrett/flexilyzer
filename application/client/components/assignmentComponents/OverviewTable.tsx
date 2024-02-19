"use client";
import { AnalyzerWithOutputs, TeamReports } from "@/types/analyzerDefinitions";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ReactElement } from "react";

interface OverviewTableParams {
  analyzersWithOutputs: AnalyzerWithOutputs[];
  allReports: TeamReports;
}

export default function OverviewTable({
  allReports,
  analyzersWithOutputs,
}: OverviewTableParams) {
  console.log(allReports);
  console.log(analyzersWithOutputs);

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn key={"teams"}>Team</TableColumn>
          <>
            {analyzersWithOutputs.flatMap((analyzer) =>
              analyzer.outputs.map((output) => {
                return (
                  <TableColumn key={output.id}>
                    {output.display_name
                      ? output.display_name
                      : output.key_name}
                  </TableColumn>
                );
              })
            )}
          </>
        </TableHeader>

        <TableBody>
          {Object.entries(allReports).map(([teamId, { reports }]) => (
            <TableRow key={teamId}>
              <TableCell>{teamId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
