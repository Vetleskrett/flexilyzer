import { ValueTypesOutput } from "@/extensions/data-contracts";

import CloseIcon from "@mui/icons-material/Close";
import { Key, SetStateAction } from "react";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { FlatMappedOutputs, FilterState } from "@/types/tableDefinitions";

const renderFilters = (
  allFlatMappedOutputs: FlatMappedOutputs[],
  selectedOutputFilterIds: Set<string>,
  toggleColumnFilters: (outputId: Key) => void,
  setFilterState: (value: SetStateAction<FilterState>) => void,
) => {
  const handleFilterNumberChange = (
    id: number,
    type: "min" | "max",
    value: number,
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

  if (selectedOutputFilterIds.size > 0) {
    return Array.from(selectedOutputFilterIds).map((outputId) => {
      const output = allFlatMappedOutputs.find(
        (output) => output.id === Number(outputId),
      );
      if (!output) return null; // Handle case where output is not found

      switch (output.value_type) {
        case ValueTypesOutput.Bool:
          // Implementation for Bool filter
          return (
            <div key={output.id} className="m-2 justify-center gap-1 p-2">
              <div className="flex flex-row items-center justify-between">
                <span className="text-small text-default-400">
                  {output.display_name ? output.display_name : output.key_name}
                </span>
                <CloseIcon
                  className="h-[18px] cursor-pointer text-default-400"
                  onClick={() => {
                    toggleColumnFilters(output.id);
                  }}
                />
              </div>

              <Tabs
                key={output.id}
                variant="bordered"
                onSelectionChange={(e) => {
                  handleFilterBoolChange(output.id, e.toString());
                }}
              >
                <Tab key="true" title="True"></Tab>
                <Tab key="false" title="False"></Tab>
              </Tabs>
            </div>
          );
        case ValueTypesOutput.Int:
        case ValueTypesOutput.Range:
          return (
            <div key={output.id} className="m-2 flex flex-col p-2">
              <div className="flex flex-row items-center justify-between">
                <span className="text-small text-default-400">
                  {output.display_name ? output.display_name : output.key_name}
                </span>
                <CloseIcon
                  className="h-[18px] cursor-pointer text-default-400"
                  onClick={() => {
                    toggleColumnFilters(output.id);
                  }}
                />
              </div>
              <div className="flex flex-row gap-1">
                <Input
                  placeholder="Min"
                  className="w-[80px]"
                  type="number"
                  onChange={(e) =>
                    handleFilterNumberChange(
                      output.id,
                      "min",
                      parseInt(e.target.value),
                    )
                  }
                />
                <Input
                  className="w-[80px]"
                  placeholder="Max"
                  type="number"
                  onChange={(e) =>
                    handleFilterNumberChange(
                      output.id,
                      "max",
                      parseInt(e.target.value),
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
};

export { renderFilters };
