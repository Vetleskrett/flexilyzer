"use client";
import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { renderCell } from "./renderCell";
import { BottomContent } from "./TableBottomContent";
import { TopContent } from "./TableTopContent";
import { renderFilters } from "./renderFilters";
import { filterReports, sortReports } from "@/utils/tableUtils";
import {
  FlatMappedOutputs,
  OverviewTableParams,
  FilterState,
} from "@/types/tableDefinitions";

const initalColumn: FlatMappedOutputs[] = [
  {
    analyzerId: 0,
    key_name: "Team",
    display_name: "Team",
    value_type: ValueTypesOutput.Int,
    id: 0,
  },
];

export default function OverviewTable({
  allReports,
  analyzersWithOutputs,
  course_id,
  assignment_id
}: OverviewTableParams) {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(
      analyzersWithOutputs.flatMap((analyzer) =>
        analyzer.outputs.map((output) => output.id.toString()),
      ),
    ),
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [selectedOutputFilterIds, setSelectedOutputFilterIds] = useState<
    Set<string>
  >(new Set([]));
  const [filterState, setFilterState] = useState<FilterState>({});

  const allReportsList = useMemo(() => {
    return Object.values(allReports).map((r) => r.reports);
  }, [allReports]);

  const flatMappedOutputs = useMemo(() => {
    return analyzersWithOutputs.flatMap((analyzer) =>
      analyzer.outputs
        .filter((output) => visibleColumns.has(output.id.toString()))
        .map((output) => ({
          ...output,
          analyzerId: analyzer.id,
        })),
    );
  }, [analyzersWithOutputs, visibleColumns]);

  const allFlatMappedOutputs = useMemo(() => {
    return analyzersWithOutputs.flatMap((analyzer) =>
      analyzer.outputs.map((output) => ({
        ...output,
        analyzerId: analyzer.id,
      })),
    );
  }, [analyzersWithOutputs]);

  const allColumnOutputs = initalColumn.concat(flatMappedOutputs);

  const filteredReports = useMemo(() => {
    return filterReports(allReportsList, filterState, allFlatMappedOutputs);
  }, [allFlatMappedOutputs, allReportsList, filterState]);

  useEffect(() => {
    if (selectedKeys === "all") {
      setSelectedKeys(
        new Set(
          filteredReports.map((teamReports) =>
            teamReports[0].team_id.toString(),
          ),
        ),
      );
    } else if (selectedKeys.size > 0) {
      setSelectedKeys(
        new Set(
          filteredReports
            .filter((teamReports) =>
              selectedKeys.has(teamReports[0].team_id.toString()),
            )
            .map((teamReports) => teamReports[0].team_id.toString()),
        ),
      );
    }
  }, [filteredReports, selectedKeys]);

  const toggleColumnFilters = (outputId: Key) => {
    setSelectedOutputFilterIds((prevState) => {
      const newState = new Set(prevState);
      const outputIdStr = outputId.toString();
      if (newState.has(outputIdStr)) {
        newState.delete(outputIdStr);
      } else {
        newState.add(outputIdStr);
      }
      return newState;
    });
  };

  const sortedReports = useMemo(() => {
    return sortReports(sortDescriptor, filteredReports);
  }, [sortDescriptor, filteredReports]);

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

  const resetView = useCallback(() => {
    setFilterState({});
    setSelectedKeys(new Set([]));
    setSelectedOutputFilterIds(new Set([]));
    setVisibleColumns(
      new Set(
        analyzersWithOutputs.flatMap((analyzer) =>
          analyzer.outputs.map((output) => output.id.toString()),
        ),
      ),
    );
    setSortDescriptor(undefined);
  }, [analyzersWithOutputs]);

  const renderFilterParameters = useCallback(() => {
    return renderFilters(
      allFlatMappedOutputs,
      selectedOutputFilterIds,
      toggleColumnFilters,
      setFilterState,
    );
  }, [allFlatMappedOutputs, selectedOutputFilterIds]);

  const topContent = useMemo(() => {
    return (
      <TopContent
        tableLength={sortedReports.length}
        analyzersWithOutputs={analyzersWithOutputs}
        renderFilterParameters={renderFilterParameters}
        resetView={resetView}
        selectedOutputFilterIds={selectedOutputFilterIds}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        toggleColumnFilters={toggleColumnFilters}
      />
    );
  }, [
    sortedReports.length,
    analyzersWithOutputs,
    renderFilterParameters,
    resetView,
    selectedOutputFilterIds,
    visibleColumns,
  ]);

  const getValue = useCallback(
    (item: ReportTeamResponse[], columnKey: string) => {
      return renderCell(item, columnKey, flatMappedOutputs, course_id, assignment_id);
    },
    [flatMappedOutputs],
  );

  const bottomContent = useMemo(() => {
    return (
      <BottomContent
        tableLength={sortedReports.length}
        selectedKeys={selectedKeys}
      />
    );
  }, [sortedReports.length, selectedKeys]);

  const ifAllowSorting = (value_type: ValueTypesOutput) => {
    if (
      [
        ValueTypesOutput.Bool,
        ValueTypesOutput.Range,
        ValueTypesOutput.Int,
        ValueTypesOutput.Date,
      ].includes(value_type)
    )
      return true;
    return false;
  };

  return (
    <div className="mt-8 max-w-[1500px] overflow-auto px-2 pb-2">
      <Table
        aria-label="overview table"
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
              // Column key needs to be a combination of key_name and analyzer, since
              // key_name alone is not unique for the whole system, only within its own analyzer
              <TableColumn
                key={`${column.key_name}-${column.analyzerId}`}
                allowsSorting={ifAllowSorting(column.value_type)}
              >
                {name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody items={sortedReports}>
          {(report: ReportTeamResponse[]) => (
            <TableRow key={report[0].team_id}>
              {(columnKey) => (
                <TableCell>{getValue(report, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
