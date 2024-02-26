"use client";
import { useState } from "react";
import { Button, Progress, Tooltip } from "@nextui-org/react";
import { FormDataT } from "@/types/analyzerDefinitions";
import SummaryStep from "@/components/createAnalyzerComponents/SummaryStep";
import BasicInfoStep from "@/components/createAnalyzerComponents/BasicInfoStep";
import OutputParamsStep from "@/components/createAnalyzerComponents/OutputParamsStep";
import InputParameters from "@/components/createAnalyzerComponents/InputParamsStep";

import api from "@/utils/apiUtils";
import { formatAnalyzerData } from "@/components/analyzerComponents/analyzerUtils";
import { useSnackbar } from "@/context/snackbarContext";
import { useRouter } from "next/navigation";

export default function NewAnalyzerPage() {
  const TOTAL_STEPS = 4;

  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataT>({
    name: "",
    description: "",
    inputs: [],
    outputs: [],
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
      router.push("/analyzers");
      router.refresh();
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

  function isCurrentStepValid() {
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
            self.findIndex(
              (i) => i.key_name.toLowerCase() === input.key_name.toLowerCase()
            ) === index
        );

        return allInputFieldsValid && allInputNamesUnique;

      case 3:
        const allOutputFieldsValid = formData.outputs.every(
          (output) =>
            output.key_name.trim() !== "" && output.value_type.trim() !== ""
        );

        const allOutputNamesUnique = formData.outputs.every(
          (output, index, self) =>
            self.findIndex(
              (i) => i.key_name.toLowerCase() === output.key_name.toLowerCase()
            ) === index
        );

        return allOutputFieldsValid && allOutputNamesUnique;
    }
  }

  return (
    <div className='relative min-h-screen-minus-navbar'>
      <Progress value={(currentStep / TOTAL_STEPS) * 100} className='my-8' />
      {renderStep()}
      <div className='absolute inset-x-0 bottom-5 px-4'>
        <div className='flex justify-between'>
          {/* Back button on the left */}
          {currentStep > 1 ? (
            <Button onClick={prevStep}>Back</Button>
          ) : (
            <div className='opacity-0'>
              <Button disabled>Back</Button>
            </div>
          )}

          {/* Next/Finish button on the right */}
          {currentStep < TOTAL_STEPS ? (
            <Tooltip
              isDisabled={isCurrentStepValid()}
              content={
                currentStep === 1
                  ? "Analyzer must have a name"
                  : "All Key Names must be non-empty and unique"
              }
            >
              <span className='inline-block' style={{ cursor: "not-allowed" }}>
                <Button
                  color='primary'
                  isDisabled={!isCurrentStepValid()}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button color='primary' onClick={submitForm}>
              Submit Analyzer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
