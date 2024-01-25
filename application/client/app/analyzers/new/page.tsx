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
import { FormDataT } from "@/app/types/analyzerDefinitions";

export default function NewAnalyzerPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataT>({
    name: "",
    description: "",
    parameters: [],
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
  const addParameter = () => {
    setFormData((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { keyName: "", valueType: "string" }], // Default valueType can be adjusted
    }));
  };

  // Function to update an existing parameter
  const updateParameter = (index: number, key: string, value: string) => {
    const updatedParameters = formData.parameters.map((param, i) => {
      if (i === index) {
        return { ...param, [key]: value };
      }
      return param;
    });

    setFormData((prev) => ({
      ...prev,
      parameters: updatedParameters,
    }));
  };

  // Optional: Function to remove a parameter
  const removeParameter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
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
            {formData.parameters.map((param, index) => (
              <div key={index} className="flex flex-col mb-4">
                <Input
                  label="Key Name"
                  placeholder="Enter key name"
                  value={param.keyName}
                  onChange={(e) =>
                    updateParameter(index, "keyName", e.target.value)
                  }
                />
                <Select
                  label="Select value type"
                  className="max-w-xs"
                  value={param.valueType}
                  onChange={(e) =>
                    updateParameter(index, "valueType", e.target.value)
                  }
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
                <Button color="danger" onClick={() => removeParameter(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addParameter}>Add Parameter</Button>
          </>
        );
      case 3:
        // Step 3 form elements
        return <h2 className="h2">{formSteps[3].name}</h2>;
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
