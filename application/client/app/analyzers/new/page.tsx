"use client";
import { useState } from "react";
import { Button, Progress, Tooltip } from "@nextui-org/react"; // Assuming Next UI components
import { FormDataT } from "@/types/analyzerDefinitions";
import { v4 as uuidv4 } from "uuid";
import SummaryStep from "@/components/createAnalyzerComponents/SummaryStep";
import BasicInfoStep from "@/components/createAnalyzerComponents/BasicInfoStep";
import OutputParamsStep from "@/components/createAnalyzerComponents/OutputParamsStep";
import InputParameters from "@/components/createAnalyzerComponents/InputParamsStep";
import { AnalyzerCreate, AnalyzerResponse } from "@/extensions/data-contracts";
import api from "@/api_utils";
import { formatAnalyzerData } from "@/components/createAnalyzerComponents/analyzerUtils";
import { useSnackbar } from "@/context/snackbarContext";

export default function NewAnalyzerPage() {
  const TOTAL_STEPS = 4;

  const { openSnackbar } = useSnackbar();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataT>({
    name: "Lighthouse Analyzer",
    description: "Analyzer to measure performance of web page.",
    inputs: [{ id: uuidv4(), key_name: "url", value_type: "string" }],
    outputs: [
      {
        id: uuidv4(),
        key_name: "performance",
        display_name: "Performance",
        value_type: "number",
      },
      {
        id: uuidv4(),
        key_name: "hashttps",
        display_name: "hasHTTPS",
        value_type: "boolean",
      },
    ],
  });

  // Handlers for navigation
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Submit form
  async function submitForm() {
    const resp = await api.postAnalyzer(formatAnalyzerData(formData));
    if (resp.ok) {
      openSnackbar({
        message: "Analyzer submitted successfully!",
        severity: "success",
      });
    } else {
      openSnackbar({
        message: `Something wrong while submitting Analyzer: ${resp.error}`,
        severity: "warning",
      });
    }
  }

  // Conditional rendering based on currentStep
  function renderStep() {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <InputParameters formData={formData} setFormData={setFormData} />
        );
      case 3:
        return (
          <OutputParamsStep formData={formData} setFormData={setFormData} />
        );
      case 4:
        return <SummaryStep formData={formData} />;
      default:
        return <></>;
    }
  }

  function isCurrentStepValid(step: number) {
    switch (currentStep) {
      case 1:
        if (formData.name === "") {
          return false;
        } else return true;
      case 2:
        const allInputFieldsValid = formData.inputs.every(
          (input) =>
            input.key_name.trim() !== "" && input.value_type.trim() !== ""
        );

        const allInputNamesUnique = formData.inputs.every(
          (input, index, self) =>
            self.findIndex((i) => i.key_name === input.key_name) === index
        );

        return allInputFieldsValid && allInputNamesUnique;

      case 3:
        const allOutputFieldsValid = formData.inputs.every(
          (input) =>
            input.key_name.trim() !== "" && input.value_type.trim() !== ""
        );

        const allOutputNamesUnique = formData.inputs.every(
          (input, index, self) =>
            self.findIndex((i) => i.key_name === input.key_name) === index
        );

        return allOutputFieldsValid && allOutputNamesUnique;
    }
  }

  return (
    <div className="relative min-h-screen-minus-navbar">
      <Progress
        value={(currentStep / TOTAL_STEPS) * 100}
        className="mb-8 mt-8"
      />
      {renderStep()}
      <div className="absolute bottom-5 inset-x-0 px-4">
        <div className="flex justify-between">
          {/* Back button on the left */}
          {currentStep > 1 ? (
            <Button onClick={prevStep}>Back</Button>
          ) : (
            <div className="opacity-0">
              <Button disabled>Back</Button>
            </div>
          )}

          {/* Next/Finish button on the right */}
          {currentStep < TOTAL_STEPS ? (
            <Tooltip
              isDisabled={isCurrentStepValid(currentStep)}
              content={
                currentStep === 1
                  ? "Analyzer must have a name"
                  : "All Key Names must be non-empty and unique"
              }
            >
              <span className="inline-block" style={{ cursor: "not-allowed" }}>
                <Button
                  color="primary"
                  isDisabled={!isCurrentStepValid(currentStep)}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button color="primary" onClick={submitForm}>
              Submit Analyzer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
