import { SummaryStepProps } from "@/app/types/analyzerDefinitions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

const InputParameters = ({ formData, setFormData }: SummaryStepProps) => {
  // Function to update an existing parameter
  const updateInputParameter = (index: number, key: string, value: string) => {
    const updatedParameters = formData.input_parameters.map((param, i) => {
      if (i === index) {
        return { ...param, [key]: value };
      }
      return param;
    });

    setFormData((prev) => ({
      ...prev,
      input_parameters: updatedParameters,
    }));
  };

  // Function to add a new parameter
  const addInputParameter = () => {
    setFormData((prev) => ({
      ...prev,
      input_parameters: [
        ...prev.input_parameters,
        { id: uuidv4(), key_name: "", value_type: "string" },
      ], // Default value_type can be adjusted
    }));
  };

  // Optional: Function to remove a parameter
  const removeInputParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      input_parameters: prev.input_parameters.filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      <h2 className="h2">Input Parameters</h2>
      {formData.input_parameters.map((param, index) => (
        <div key={param.id} className="flex items-center space-x-2 mb-4">
          <Input
            isRequired
            label="Key Name"
            placeholder="Enter key name"
            value={param.key_name}
            onChange={(e) => {
              const isValid = /^[a-z_]+$/.test(e.target.value);
              if (isValid || e.target.value === "") {
                updateInputParameter(index, "key_name", e.target.value);
              }
            }}
          />
          <Select
            isRequired
            label="Select value type"
            className="max-w-xs"
            value={param.value_type}
            defaultSelectedKeys={[param.value_type]}
            onChange={(e) => {
              updateInputParameter(index, "value_type", e.target.value);
            }}
          >
            <SelectItem key={"string"} value={"string"}>
              String
            </SelectItem>
            <SelectItem key={"number"} value={"number"}>
              Number
            </SelectItem>
            <SelectItem key={"bool"} value={"bool"}>
              Boolean
            </SelectItem>
          </Select>
          {/* Optional: Button to remove this parameter */}
          <Button color="danger" onClick={() => removeInputParameter(index)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex justify-center w-full">
        <Button color="secondary" onClick={addInputParameter}>
          Add Parameter
        </Button>
      </div>
    </>
  );
};

export default InputParameters;
