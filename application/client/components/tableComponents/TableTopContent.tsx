import { ValueTypesOutput } from "@/extensions/data-contracts";
import { AnalyzerWithOutputs } from "@/types/analyzerDefinitions";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Checkbox,
  Dropdown,
  Button,
} from "@nextui-org/react";

import RuleIcon from "@mui/icons-material/Rule";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { Key, SetStateAction } from "react";

interface TopContentProps {
  tableLength: number;
  analyzersWithOutputs: AnalyzerWithOutputs[];
  renderFilterParameters: () => (JSX.Element | null)[] | undefined;
  resetView: () => void;
  selectedOutputFilterIds: Set<string>;
  visibleColumns: Set<string>;
  setVisibleColumns: (value: SetStateAction<Set<string>>) => void;
  toggleColumnFilters: (outputId: Key) => void;
}

const TopContent = ({
  tableLength,
  analyzersWithOutputs,
  renderFilterParameters,
  resetView,
  selectedOutputFilterIds,
  visibleColumns,
  setVisibleColumns,
  toggleColumnFilters,
}: TopContentProps) => {
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
            className="max-h-[70vh] overflow-auto"
          >
            {analyzersWithOutputs.map((analyzer) => (
              <DropdownSection key={analyzer.id} title={analyzer.analyzer_name}>
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
            className="max-h-[70vh] overflow-auto"
          >
            {analyzersWithOutputs.map((analyzer) => (
              <DropdownSection key={analyzer.id} title={analyzer.analyzer_name}>
                {analyzer.outputs
                  .filter((output) =>
                    [
                      ValueTypesOutput.Int,
                      ValueTypesOutput.Range,
                      ValueTypesOutput.Bool,
                    ].includes(output.value_type),
                  )
                  .map((output) => (
                    <DropdownItem
                      key={output.id}
                      textValue={output.id.toString()}
                    >
                      <Checkbox
                        isSelected={selectedOutputFilterIds.has(
                          output.id.toString(),
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
      <div className="flex flex-col items-center justify-center">
        <div className="flex">{renderFilterParameters()}</div>
      </div>
      <div>
        <span className="text-small text-default-400">
          Total {tableLength} teams
        </span>
      </div>
    </div>
  );
};

export { TopContent };
