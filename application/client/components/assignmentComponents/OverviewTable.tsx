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
  Selection,
  DropdownSection,
  SortDescriptor,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RuleIcon from "@mui/icons-material/Rule";

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

interface FilterState {
  [key: string]: {
    value_type: ValueTypesOutput;
    boolValue?: boolean;
    intValue?: { min?: number; max?: number };
  };
}

export default function OverviewTable({
  allReports,
  analyzersWithOutputs,
}: OverviewTableParams) {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(
      analyzersWithOutputs.flatMap((analyzer) =>
        analyzer.outputs.map((output) => output.id.toString())
      )
    )
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [selectedOutputFilterIds, setSelectedOutputFilterIds] = useState<
    Set<string>
  >(new Set([]));
  const [filterState, setFilterState] = useState<FilterState>({});

  const allReportsList: ReportTeamResponse[][] = Object.values(allReports).map(
    (r) => r.reports
  );

  const initalColumn: FlatMappedOutputs[] = [
    {
      analyzerId: 0,
      key_name: "Team",
      display_name: "Team",
      value_type: ValueTypesOutput.Int,
      id: 0,
    },
  ];

  const flatMappedOutputs = analyzersWithOutputs.flatMap((analyzer) =>
    analyzer.outputs
      .filter((output) => visibleColumns.has(output.id.toString()))
      .map((output) => ({
        ...output,
        analyzerId: analyzer.id,
      }))
  );
  const allFlatMappedOutputs = analyzersWithOutputs.flatMap((analyzer) =>
    analyzer.outputs.map((output) => ({
      ...output,
      analyzerId: analyzer.id,
    }))
  );

  const allColumnOutputs = initalColumn.concat(flatMappedOutputs);

  const filteredReports = useMemo(() => {
    // Iterate over all teams' reports
    const filtered = allReportsList.map((teamReports) => {
      // Filter reports within each team based on filterState criteria
      return teamReports.filter((report) => {
        // Assume report passes all filters initially
        let passesFilters = true;

        // Check each filter in filterState
        Object.entries(filterState).forEach(([key, filter]) => {
          const output = allFlatMappedOutputs.find(
            (output) => output.id === Number(key)
          );
          if (output === undefined) {
            return;
          }
          const reportValue = report.report[output?.key_name]; // Dynamically access the value from report

          switch (filter.value_type) {
            case ValueTypesOutput.Bool:
              if (
                filter.boolValue !== undefined &&
                reportValue !== filter.boolValue
              ) {
                passesFilters = false;
              }
              break;
            case ValueTypesOutput.Int:
            case ValueTypesOutput.Range:
              if (filter.intValue) {
                const { min, max } = filter.intValue;
                if (min !== undefined && (reportValue as number) < min) {
                  passesFilters = false;
                }
                if (max !== undefined && (reportValue as number) > max) {
                  passesFilters = false;
                }
              }
              break;
            // Add more cases as necessary for other types
          }
        });

        return passesFilters;
      });
    });

    // Remove empty teams from filtered results
    return filtered.filter((teamReports) => teamReports.length > 0);
  }, [allFlatMappedOutputs, allReportsList, filterState]);

  const sortedItems = useMemo(() => {
    if (sortDescriptor == undefined) return filteredReports;

    const col = sortDescriptor.column as string;
    const [descriptor, id] = col.split("-");

    if ("Team" === descriptor)
      return sortDescriptor.direction == "ascending"
        ? filteredReports.reverse()
        : filteredReports;

    return [...filteredReports].sort((a, b) => {
      const firstReport = a.find((report) =>
        report.report.hasOwnProperty(descriptor)
      );
      const secondReport = b.find((report) =>
        report.report.hasOwnProperty(descriptor)
      );

      let firstValue = firstReport ? firstReport.report[descriptor] : null;
      let secondValue = secondReport ? secondReport.report[descriptor] : null;

      if (typeof firstValue === "string") {
        firstValue = parseFloat(firstValue);
      }
      if (typeof secondValue === "string") {
        secondValue = parseFloat(secondValue);
      }

      // when some teams dont have values for report outputs
      if (sortDescriptor.direction === "descending") {
        if (firstValue == null) return 1;
        if (secondValue == null) return -1;
      } else {
        if (firstValue == null) return -1;
        if (secondValue == null) return 1;
      }

      let comparison = 0;
      if (firstValue < secondValue) {
        comparison = -1;
      } else if (firstValue > secondValue) {
        comparison = 1;
      }

      return sortDescriptor.direction === "descending"
        ? -comparison
        : comparison;
    });
  }, [sortDescriptor, filteredReports]);

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

  const toggleColumnFilters = (columnId: Key) => {
    setSelectedOutputFilterIds((prevState) => {
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

  useEffect(() => {
    setFilterState((currentState) => {
      const newFilterState: FilterState = Object.keys(currentState)
        .filter((key) => selectedOutputFilterIds.has(key))
        .reduce<FilterState>((acc, key) => {
          acc[key] = currentState[key];
          return acc;
        }, {});
      return newFilterState;
    });
  }, [selectedOutputFilterIds]);

  const handleFilterNumberChange = (
    id: number,
    type: "min" | "max",
    value: number
  ) => {
    setFilterState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        value_type: ValueTypesOutput.Int,
        intValue: { ...prev[id]?.intValue, [type]: value },
      },
    }));
  };

  const handleFilterBoolChange = (id: number, value: string) => {
    const boolValue = value === "true";
    setFilterState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        value_type: ValueTypesOutput.Bool,
        boolValue: boolValue,
      },
    }));
  };

  const resetView = useCallback(() => {
    setFilterState({});
    setSelectedKeys(new Set([]));
    setSelectedOutputFilterIds(new Set([]));
    setVisibleColumns(
      new Set(
        analyzersWithOutputs.flatMap((analyzer) =>
          analyzer.outputs.map((output) => output.id.toString())
        )
      )
    );
    setSortDescriptor(undefined);
  }, [analyzersWithOutputs]);

  const renderFilterParameters = useCallback(() => {
    if (selectedOutputFilterIds.size > 0) {
      return Array.from(selectedOutputFilterIds).map((outputId) => {
        const output = allFlatMappedOutputs.find(
          (output) => output.id === Number(outputId)
        );
        if (!output) return null; // Handle case where output is not found

        switch (output.value_type) {
          case ValueTypesOutput.Bool:
            // Implementation for Bool filter
            return (
              <div
                key={output.id}
                className="border border-gray-200 rounded-lg justify-center gap-1 p-2 m-2"
              >
                <div>
                  <span className="text-default-400 text-small">
                    {output.display_name
                      ? output.display_name
                      : output.key_name}
                  </span>
                </div>
                <RadioGroup
                  orientation="horizontal"
                  size="sm"
                  onValueChange={(e) => {
                    handleFilterBoolChange(output.id, e);
                  }}
                >
                  <Radio value={"true"}>True</Radio>
                  <Radio value={"false"}>False</Radio>
                </RadioGroup>
              </div>
            );
          case ValueTypesOutput.Int:
          case ValueTypesOutput.Range:
            return (
              <div
                key={output.id}
                className="border border-gray-200 rounded-lg flex flex-col gap-1 p-2 m-2"
              >
                <div>
                  <span className="text-default-400 text-small">
                    {output.display_name
                      ? output.display_name
                      : output.key_name}
                  </span>
                </div>
                <div className="flex flex-row">
                  <Input
                    size="sm"
                    label="Min"
                    className="w-[80px]"
                    type="number"
                    onChange={(e) =>
                      handleFilterNumberChange(
                        output.id,
                        "min",
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <Input
                    size="sm"
                    className="w-[80px]"
                    label="Max"
                    type="number"
                    onChange={(e) =>
                      handleFilterNumberChange(
                        output.id,
                        "max",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            );
          default:
            return <div key={output.id}>Unsupported filter type</div>;
        }
      });
    } else {
      return;
    }
  }, [allFlatMappedOutputs, selectedOutputFilterIds]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-end gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="md"
                variant="bordered"
                color="secondary"
                startContent={<RuleIcon />}
              >
                Select Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              aria-label="Choose Columns"
              onAction={toggleColumnVisibility}
            >
              {analyzersWithOutputs.map((analyzer) => (
                <DropdownSection
                  key={analyzer.id}
                  title={analyzer.analyzer_name}
                >
                  {analyzer.outputs.map((output) => (
                    <DropdownItem
                      key={output.id}
                      textValue={output.id.toString()}
                    >
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
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="md"
                variant="bordered"
                color="secondary"
                startContent={<FilterAltIcon />}
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              aria-label="Choose Filter Columns"
              onAction={toggleColumnFilters}
            >
              {analyzersWithOutputs.map((analyzer) => (
                <DropdownSection
                  key={analyzer.id}
                  title={analyzer.analyzer_name}
                >
                  {analyzer.outputs
                    .filter((output) =>
                      [
                        ValueTypesOutput.Int,
                        ValueTypesOutput.Range,
                        ValueTypesOutput.Bool,
                      ].includes(output.value_type)
                    )
                    .map((output) => (
                      <DropdownItem
                        key={output.id}
                        textValue={output.id.toString()}
                      >
                        <Checkbox
                          isSelected={selectedOutputFilterIds.has(
                            output.id.toString()
                          )}
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
          <Button
            onClick={() => {
              resetView();
            }}
            color="warning"
            className="text-white"
            startContent={<RestartAltIcon />}
          >
            Reset
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex">{renderFilterParameters()}</div>
        </div>
        <div>
          <span className="text-default-400 text-small">
            Total {allReportsList.length} teams
          </span>
        </div>
      </div>
    );
  }, [
    allReportsList.length,
    analyzersWithOutputs,
    renderFilterParameters,
    resetView,
    selectedOutputFilterIds,
    visibleColumns,
  ]);

  const getValue = useCallback(
    (item: ReportTeamResponse[], columnKey: string) => {
      const [name, id] = columnKey.split("-");

      if (name === "Team") return item[0].team_id;
      const report = item.find(
        (r: ReportTeamResponse) => r.analyzer_id === Number(id)
      );
      const value = report ? report.report[name] : undefined;

      const output = flatMappedOutputs.find(
        (output) => output.analyzerId === Number(id) && output.key_name === name
      );
      if (!output) return value;

      switch (output.value_type) {
        case ValueTypesOutput.Range:
          interface RangeMetadata {
            fromRange: number;
            toRange: number;
          }

          const extendedMetadata =
            output.extended_metadata as unknown as RangeMetadata;

          return (
            value && (
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
            )
          );
        case ValueTypesOutput.Str:
          return value;
        case ValueTypesOutput.Bool:
          return (
            value !== undefined && (
              <Chip
                size="sm"
                variant="solid"
                color={(value as boolean) ? "success" : "danger"}
                className="text-white"
              >
                {value ? "Yes" : "No"}
              </Chip>
            )
          );
        case ValueTypesOutput.Int:
          return value;
        default:
          return "N/A";
      }
    },
    [flatMappedOutputs]
  );

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${allReportsList.length} selected`}
        </span>
      </div>
    );
  }, [allReportsList.length, selectedKeys]);

  const ifAllowSorting = (value_type: ValueTypesOutput) => {
    if (
      [
        ValueTypesOutput.Bool,
        ValueTypesOutput.Range,
        ValueTypesOutput.Int,
      ].includes(value_type)
    )
      return true;
    return false;
  };

  return (
    
      <div className="max-w-full px-2 pb-2 overflow-auto mt-8">
        <Table
          bottomContent={bottomContent}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
          isHeaderSticky
        >
          <TableHeader columns={allColumnOutputs}>
            {(column) => {
              const name = column.display_name
                ? column.display_name
                : column.key_name;
              return (
                <TableColumn
                  key={`${column.key_name}-${column.analyzerId}`}
                  allowsSorting={ifAllowSorting(column.value_type)}
                >
                  {name}
                </TableColumn>
              );
            }}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item: ReportTeamResponse[]) => (
              <TableRow key={item[0].team_id}>
                {(columnKey) => (
                  <TableCell>{getValue(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
  );
}
