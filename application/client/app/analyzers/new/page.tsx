"use client";
import { useState } from "react";
import { Button, Progress } from "@nextui-org/react"; // Assuming Next UI components
import { FormDataT } from "@/app/types/analyzerDefinitions";
import { v4 as uuidv4 } from "uuid";
import SummaryStep from "@/components/createAnalyzerComponents/SummaryStep";
import BasicInfoStep from "@/components/createAnalyzerComponents/BasicInfoStep";
import OutputParamsStep from "@/components/createAnalyzerComponents/OutputParamsStep";
import InputParameters from "@/components/createAnalyzerComponents/InputParamsStep";
import { AnalyzerCreate, AnalyzerResponse } from "@/extensions/data-contracts";

export default function NewAnalyzerPage() {
  const TOTAL_STEPS = 4;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataT>({
    name: "lighthouse analyzer",
    description: "analyzer to measure performance of web page",
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
        return (
          <>
            <SummaryStep formData={formData} setFormData={setFormData} />
          </>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <Progress
        value={(currentStep / TOTAL_STEPS) * 100}
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
        {currentStep < TOTAL_STEPS ? (
          <Button color="primary" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button color="primary" onClick={submitForm}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
