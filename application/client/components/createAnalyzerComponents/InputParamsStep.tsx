import { ValueTypesInput } from "@/extensions/data-contracts";
import { SummaryStepProps } from "@/types/analyzerDefinitions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

const InputParameters = ({ formData, setFormData }: SummaryStepProps) => {
  // Function to update an existing parameter
  const updateInputParameter = (index: number, key: string, value: string) => {
    const updatedParameters = formData.inputs.map((param, i) => {
      if (i === index) {
        // If value_type is "zip", key_name should be set to a default key_name accordingly
        if (key === "value_type" && value === ValueTypesInput.Zip) {
          return { ...param, [key]: value, key_name: "zip_file_path" };
        } else {
          return { ...param, [key]: value };
        }
      }
      return param;
    });

    setFormData((prev) => ({
      ...prev,
      inputs: updatedParameters,
    }));
  };

  // Function to add a new parameter
  const addInputParameter = () => {
    setFormData((prev) => ({
      ...prev,
      inputs: [
        ...prev.inputs,
        { id: uuidv4(), key_name: "", value_type: ValueTypesInput.Str },
      ], // Default value_type can be adjusted
    }));
  };

  // Optional: Function to remove a parameter
  const removeInputParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="pb-16">
        <h2 className="h2">Input Parameters</h2>
        {formData.inputs.map((param, index) => (
          <div key={param.id} className="mb-4 flex items-center space-x-2">
            <Input
              isDisabled={param.value_type === ValueTypesInput.Zip}
              isRequired
              label="Key Name"
              placeholder="Enter key name"
              value={param.key_name}
              onChange={(e) => {
                console.log("here");
                // Regular expression: starts with a lowercase letter, followed by any mix of lowercase, uppercase letters, or underscores
                const isValid = /^[a-z][a-zA-Z_]*$/.test(e.target.value);
                if (isValid || e.target.value === "") {
                  updateInputParameter(index, "key_name", e.target.value);
                }
              }}
            />

            <Select
              disabledKeys={
                formData.inputs.some(
                  (input) => input.value_type === ValueTypesInput.Zip,
                )
                  ? [ValueTypesInput.Zip]
                  : []
              }
              isRequired
              disallowEmptySelection
              label="Select value type"
              className="max-w-xs"
              value={param.value_type}
              defaultSelectedKeys={[param.value_type]}
              onChange={(e) => {
                updateInputParameter(index, "value_type", e.target.value);
              }}
            >
              {Object.entries(ValueTypesInput).map((output) => (
                <SelectItem key={output[1]} value={output[1]}>
                  {output[0]}
                </SelectItem>
              ))}
            </Select>
            {/* Optional: Button to remove this parameter */}
            <Button color="danger" onClick={() => removeInputParameter(index)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex w-full justify-center">
          <Button color="secondary" onClick={addInputParameter}>
            Add Parameter
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputParameters;
