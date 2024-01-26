"use client";
import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Progress,
  Select,
  SelectItem,
} from "@nextui-org/react"; // Assuming Next UI components
import { FormDataT, RangeMetadata } from "@/app/types/analyzerDefinitions";
import { v4 as uuidv4 } from "uuid";

export default function NewAnalyzerPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataT>({
    name: "",
    description: "",
    input_parameters: [],
    output_parameters: [],
  });

  const formSteps = {
    1: { name: "Basic Info" },
    2: { name: "Input Parameters" },
    3: { name: "Output Parameters" },
    4: { name: "Upload and Finalize" },
  };

  // Update form data
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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

  // Optional: Function to remove a parameter
  const removeInputParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      input_parameters: prev.input_parameters.filter((_, i) => i !== index),
    }));
  };

  // Function to add a new parameter
  const addOutputParameter = () => {
    setFormData((prev) => ({
      ...prev,
      output_parameters: [
        ...prev.output_parameters,
        { id: uuidv4(), key_name: "", display_name: "", value_type: "string" },
      ], // Default value_type can be adjusted
    }));
  };

  // Function to update an existing output parameter
  const updateOutputParameter = (index: number, key: string, value: string) => {
    const updatedParameters = formData.output_parameters.map((param, i) => {
      if (i === index) {
        if (key === "value_type") {
          if (value === "range") {
            // Add or update the extended_metadata with default range values
            return {
              ...param,
              [key]: value,
              extended_metadata: {
                from_value: 0,
                to_value: 100,
              },
            };
          } else {
            // If another value type is chosen, ensure extended_metadata is removed
            // Use object destructuring to omit extended_metadata from the updated object
            const { extended_metadata, ...rest } = param;
            return { ...rest, [key]: value };
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
      output_parameters: updatedParameters,
    }));
  };

  // Function to update an existing output parameter
  const updateExtendedMetadata = (
    index: number,
    key: keyof RangeMetadata,
    value: string
  ) => {
    const updatedParameters = formData.output_parameters.map((param, i) => {
      if (i === index) {
        console.log(value);
        let newValue = undefined;

        if (value) {
          newValue = Number(value);
        }
        if (Number.isNaN(newValue)) {
          return param;
        }
        let prevExtendedMetadata = param.extended_metadata;

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
      output_parameters: updatedParameters,
    }));
  };

  // Optional: Function to remove a parameter
  const removeOutputParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      output_parameters: prev.output_parameters.filter((_, i) => i !== index),
    }));
  };

  // Handlers for navigation
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, Object.keys(formSteps).length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Submit form
  const submitForm = async () => {
    try {
      console.log("Submitting form...", formData);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Conditional rendering based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="h2">{formSteps[1].name}</h2>
            <Input
              isRequired
              size="lg"
              label="Name"
              placeholder="Analyzer Name"
              value={formData.name}
              className="max-w-xs mb-8"
              onChange={(e) => updateFormData("name", e.target.value)}
            />

            <Textarea
              fullWidth
              size="lg"
              label="Description"
              value={formData.description}
              placeholder="Analyzer Description"
              className="max-w-xs"
              onChange={(e) => updateFormData("description", e.target.value)}
            />
          </>
        );
      case 2:
        // Step 2 form elements
        return (
          <>
            <h2 className="h2">{formSteps[2].name}</h2>
            {formData.input_parameters.map((param, index) => (
              <div key={param.id} className="flex items-center space-x-2 mb-4">
                <Input
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
                <Button
                  color="danger"
                  onClick={() => removeInputParameter(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex justify-center w-full">
              <Button onClick={addInputParameter}>Add Parameter</Button>
            </div>
          </>
        );
      case 3:
        // Step 3 form elements
        return (
          <>
            <h2 className="h2">{formSteps[3].name}</h2>
            {formData.output_parameters.map((param, index) => (
              <>
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <Input
                    pattern="\S+"
                    label="Key Name"
                    placeholder="Enter key name"
                    value={param.key_name}
                    onChange={(e) => {
                      const isValid = /^[a-z_]+$/.test(e.target.value);
                      if (isValid || e.target.value === "") {
                        updateOutputParameter(
                          index,
                          "key_name",
                          e.target.value
                        );
                      }
                    }}
                  />
                  <Input
                    label="Display Name"
                    placeholder="Enter display name"
                    value={param.display_name}
                    onChange={(e) =>
                      updateOutputParameter(
                        index,
                        "display_name",
                        e.target.value
                      )
                    }
                  />
                  <Select
                    label="Select value type"
                    className="max-w-xs"
                    value={param.value_type}
                    defaultSelectedKeys={[param.value_type]}
                    onChange={(e) => {
                      updateOutputParameter(
                        index,
                        "value_type",
                        e.target.value
                      );
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
                    <SelectItem key={"range"} value={"range"}>
                      Range
                    </SelectItem>
                  </Select>
                  {param.extended_metadata ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Input
                          label="Min"
                          placeholder="Enter from value"
                          value={
                            param.extended_metadata.from_value === undefined
                              ? ""
                              : param.extended_metadata.from_value.toString()
                          }
                          onChange={(e) =>
                            updateExtendedMetadata(
                              index,
                              "from_value",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          label="Max"
                          placeholder="Enter to value"
                          value={
                            param.extended_metadata.to_value === undefined
                              ? ""
                              : param.extended_metadata.to_value.toString()
                          }
                          onChange={(e) =>
                            updateExtendedMetadata(
                              index,
                              "to_value",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </>
                  ) : (
                    ""
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
            <div className="flex justify-center w-full">
              <Button onClick={addOutputParameter}>Add Parameter</Button>
            </div>
          </>
        );

      case 4:
        return <h2 className="h2">{formSteps[4].name}</h2>;
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <Progress
        value={(currentStep / Object.keys(formSteps).length) * 100}
        className="mb-8 mt-8"
      />
      {renderStep()}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {currentStep > 1 ? (
          <Button onClick={prevStep}>Back</Button>
        ) : (
          <div style={{ visibility: "hidden" }}>
            <Button disabled>Back</Button>
          </div>
        )}
        {currentStep < Object.keys(formSteps).length ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={submitForm}>Finish</Button>
        )}
      </div>
    </div>
  );
}
