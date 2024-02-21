import {
  Accordion,
  AccordionItem,
  Card,
  Input,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react"; // Assuming Next UI components

import InfoCardContent from "./AnalyzerInfoCard";
import { SummaryStepProps } from "@/types/analyzerDefinitions";

const BasicInfoStep = ({ formData, setFormData }: SummaryStepProps) => {
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Accordion for narrow screens */}
      <div className="mb-4 sm:w-1/2 md:mb-0">
        <div className="sm:hidden">
          <Accordion>
            <AccordionItem title="Useful information">
              <InfoCardContent />
            </AccordionItem>
          </Accordion>
        </div>

        {/* Static Info Card for larger screens */}

        <Card className="hidden max-h-screen-minus-navbar overflow-auto p-4 sm:block">
          <ScrollShadow hideScrollBar>
            <InfoCardContent />
          </ScrollShadow>
        </Card>
      </div>

      {/* Form Fields */}
      <div className="grow">
        <h2 className="h2">Name and description</h2>

        <Input
          isRequired
          size="lg"
          label="Name"
          placeholder="Analyzer Name"
          value={formData.name}
          className="mb-8"
          onChange={(e) => updateFormData("name", e.target.value)}
        />

        <Textarea
          size="lg"
          label="Description"
          placeholder="Analyzer Description"
          value={formData.description}
          className="mb-8"
          onChange={(e) => updateFormData("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
