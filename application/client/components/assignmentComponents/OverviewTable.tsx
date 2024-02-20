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
  Dropdown,
  Checkbox,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  DropdownSection,
} from "@nextui-org/react";
import { Key, useState } from "react";

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
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(
      analyzersWithOutputs.flatMap((analyzer) =>
        analyzer.outputs.map((output) => output.id.toString())
      )
    )
  );

  const toggleColumnVisibility = (columnId: Key) => {
    setVisibleColumns((prevState) => {
      const newState = new Set(prevState);
      const columnIdStr = columnId.toString();
      if (newState.has(columnIdStr)) {
        newState.delete(columnIdStr);
      } else {
        newState.add(columnIdStr);
      }
      return newState;
    });
  };

  const flatMappedOutputs = analyzersWithOutputs.flatMap((analyzer) =>
    analyzer.outputs
      .filter((output) => visibleColumns.has(output.id.toString()))
      .map((output) => ({
        ...output,
        analyzerId: analyzer.id,
      }))
  );

  const columnSelectionDropdown = (
    <div className='flex flex-row justify-center'>
      <Dropdown>
        <DropdownTrigger>
          <Button size='md' variant='light'>
            Columns
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          closeOnSelect={false}
          aria-label='Choose Columns'
          onAction={toggleColumnVisibility}
        >
          {analyzersWithOutputs.map((analyzer) => (
            <DropdownSection key={analyzer.id} title={analyzer.analyzer_name}>
              {analyzer.outputs.map((output) => (
                <DropdownItem key={output.id} textValue={output.id.toString()}>
                  <Checkbox
                    isSelected={visibleColumns.has(output.id.toString())}
                  >
                    {output.display_name
                      ? output.display_name
                      : output.key_name}
                  </Checkbox>
                </DropdownItem>
              ))}
            </DropdownSection>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  const columnHeaders = [
    <TableColumn key='team'>Team</TableColumn>,
    ...flatMappedOutputs.map((output) => (
      <TableColumn key={output.id}>
        {output.display_name ? output.display_name : output.key_name}
      </TableColumn>
    )),
  ];

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
                      size='md'
                      value={value}
                      minValue={extendedMetadata.fromRange}
                      maxValue={extendedMetadata.toRange}
                      color={
                        value / extendedMetadata.toRange > 0.65
                          ? "success"
                          : "warning"
                      }
                      className='max-w-md'
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
                    size='sm'
                    variant='solid'
                    color={(value as boolean) ? "success" : "danger"}
                    className='text-white'
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
        }
      }),
    ];

    return <TableRow key={teamId}>{cells}</TableRow>;
  });

  return (
    <>
      <Table topContent={columnSelectionDropdown}>
        <TableHeader>{columnHeaders}</TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    </>
  );
}
