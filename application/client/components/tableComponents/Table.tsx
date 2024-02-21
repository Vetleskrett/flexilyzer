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

  const allReportsList: ReportTeamResponse[][] = Object.values(allReports).map(
    (r) => r.reports,
  );

  const flatMappedOutputs = analyzersWithOutputs.flatMap((analyzer) =>
    analyzer.outputs
      .filter((output) => visibleColumns.has(output.id.toString()))
      .map((output) => ({
        ...output,
        analyzerId: analyzer.id,
      })),
  );
  const allFlatMappedOutputs = analyzersWithOutputs.flatMap((analyzer) =>
    analyzer.outputs.map((output) => ({
      ...output,
      analyzerId: analyzer.id,
    })),
  );

  const allColumnOutputs = initalColumn.concat(flatMappedOutputs);

  const filteredReports = useMemo(() => {
    return filterReports(allReportsList, filterState, allFlatMappedOutputs);
  }, [allFlatMappedOutputs, allReportsList, filterState]);

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
        tableLength={allReportsList.length}
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
    allReportsList.length,
    analyzersWithOutputs,
    renderFilterParameters,
    resetView,
    selectedOutputFilterIds,
    visibleColumns,
  ]);

  const getValue = useCallback(
    (item: ReportTeamResponse[], columnKey: string) => {
      return renderCell(item, columnKey, flatMappedOutputs);
    },
    [flatMappedOutputs],
  );

  const bottomContent = useMemo(() => {
    return (
      <BottomContent
        tableLength={allReportsList.length}
        selectedKeys={selectedKeys}
      />
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
    <div className="mt-8 max-w-full overflow-auto px-2 pb-2">
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
