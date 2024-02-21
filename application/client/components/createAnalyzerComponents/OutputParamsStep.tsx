import { RangeMetadata, SummaryStepProps } from "@/types/analyzerDefinitions";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

import HelpIcon from "@mui/icons-material/Help";
import { ValueTypesOutput } from "@/extensions/data-contracts";

export default function OutputParamsStep({
  formData,
  setFormData,
}: SummaryStepProps) {
  // Function to update an existing output parameter
  const updateOutputParameter = (index: number, key: string, value: string) => {
    const updatedParameters = formData.outputs.map((param, i) => {
      if (i === index) {
        if (key === "value_type") {
          if (value === ValueTypesOutput.Range) {
            // Add or update the extended_metadata with default range values
            return {
              ...param,
              [key]: value,
              extended_metadata: {
                fromRange: 0,
                toRange: 100,
              },
            };
          } else {
            // If another value type is chosen, ensure extended_metadata is removed
            // Use object destructuring to omit extended_metadata from the updated object
            const { extended_metadata: _extended_metadata, ...rest } = param;
            return { ...rest, [key]: value as ValueTypesOutput };
          }
        } else {
          // For updates to fields other than value_type, just update the field
          return { ...param, [key]: value };
        }
      }
      return param;
    });

    setFormData((prev) => ({
      ...prev,
      outputs: updatedParameters,
    }));
  };
  const updateExtendedMetadata = (
    index: number,
    key: keyof RangeMetadata,
    value: string,
  ) => {
    const updatedParameters = formData.outputs.map((param, i) => {
      if (i === index) {
        let newValue = undefined;

        if (value) {
          newValue = Number(value);
        }
        if (Number.isNaN(newValue)) {
          return param;
        }
        const prevExtendedMetadata = param.extended_metadata;

        if (prevExtendedMetadata) {
          prevExtendedMetadata[key] = newValue;
        }
        return {
          ...param,
          extended_metadata: prevExtendedMetadata,
        };
      }
      return param;
    });

    setFormData((prev) => ({
      ...prev,
      outputs: updatedParameters,
    }));
  };

  // Optional: Function to remove a parameter
  const removeOutputParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      outputs: prev.outputs.filter((_, i) => i !== index),
    }));
  };

  // Function to add a new parameter
  const addOutputParameter = () => {
    setFormData((prev) => ({
      ...prev,
      outputs: [
        ...prev.outputs,
        {
          id: uuidv4(),
          key_name: "",
          display_name: "",
          value_type: ValueTypesOutput.Str,
        },
      ], // Default value_type can be adjusted
    }));
  };

  return (
    <>
      <div className="pb-16">
        <h2 className="h2">
          Output Parameters{" "}
          <Popover placement="right" className="pb-3">
            <PopoverTrigger>
              <HelpIcon />
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-full max-w-sm px-1 py-2">
                <div className="text-small font-bold">Output Parameters</div>
                <div className="text-tiny">
                  In this step, you define the different parameters your
                  analyzer script is expected to return, i.e., what the report
                  will consist of. <br />
                  <br />
                  <b>Key Name</b> is the key of the parameter in the return
                  object from your analyzer. Key Name must start with a lower
                  case character, but might also consist of underscores and
                  upper case characters.
                  <br />
                  <br />
                  <b>Display Name</b> is an optional parameter which will
                  replace the Key Name in all cases where the report is
                  displayed to other users, e.g. students.
                  <br />
                  <br />
                  <b>Value type</b> is the type of the returned parameter.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </h2>

        {formData.outputs.map((param, index) => (
          <>
            <div key={param.id} className="mb-4 flex items-center space-x-2">
              <Input
                isRequired
                label="Key Name"
                placeholder="Enter key name"
                value={param.key_name}
                onChange={(e) => {
                  // Regular expression: starts with a lowercase letter, followed by any mix of lowercase, uppercase letters, or underscores
                  const isValid = /^[a-z][a-zA-Z_]*$/.test(e.target.value);
                  if (isValid || e.target.value === "") {
                    updateOutputParameter(index, "key_name", e.target.value);
                  }
                }}
              />

              <Input
                label="Display Name"
                placeholder="Enter display name"
                value={param.display_name}
                onChange={(e) =>
                  updateOutputParameter(index, "display_name", e.target.value)
                }
              />
              <Select
                isRequired
                label="Value type"
                className="max-w-xs"
                value={param.value_type}
                defaultSelectedKeys={[param.value_type]}
                onChange={(e) => {
                  updateOutputParameter(index, "value_type", e.target.value);
                }}
              >
                <SelectItem key={"str"} value={ValueTypesOutput.Str}>
                  str
                </SelectItem>
                <SelectItem key={"int"} value={ValueTypesOutput.Int}>
                  int
                </SelectItem>
                <SelectItem key={"bool"} value={ValueTypesOutput.Bool}>
                  bool
                </SelectItem>
                <SelectItem key={"range"} value={ValueTypesOutput.Range}>
                  int (range)
                </SelectItem>
              </Select>
              {param.extended_metadata && (
                <>
                  <div className="flex items-center space-x-2">
                    <Input
                      isRequired
                      label="Min"
                      placeholder="Enter from value"
                      value={
                        param.extended_metadata.fromRange === undefined
                          ? ""
                          : param.extended_metadata.fromRange.toString()
                      }
                      onChange={(e) =>
                        updateExtendedMetadata(
                          index,
                          "fromRange",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      isRequired
                      label="Max"
                      placeholder="Enter to value"
                      value={
                        param.extended_metadata.toRange === undefined
                          ? ""
                          : param.extended_metadata.toRange.toString()
                      }
                      onChange={(e) =>
                        updateExtendedMetadata(index, "toRange", e.target.value)
                      }
                    />
                  </div>
                </>
              )}
              <Button
                color="danger"
                onClick={() => removeOutputParameter(index)}
              >
                Remove
              </Button>
            </div>
          </>
        ))}
        <div className="flex w-full justify-center">
          <Button color="secondary" onClick={addOutputParameter}>
            Add Parameter
          </Button>
        </div>
      </div>
    </>
  );
}
