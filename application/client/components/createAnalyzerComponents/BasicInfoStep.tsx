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

  const infoCardContent = "Your info content here...";

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
      {/* Accordion for narrow screens */}
      <div className='sm:w-1/2 mb-4 md:mb-0'>
        <div className='sm:hidden'>
          <Accordion>
            <AccordionItem title='Useful information'>
              <InfoCardContent />
            </AccordionItem>
          </Accordion>
        </div>

        {/* Static Info Card for larger screens */}

        <Card className='hidden sm:block p-4 max-h-screen-minus-navbar overflow-auto'>
          <ScrollShadow hideScrollBar>
            <InfoCardContent />
          </ScrollShadow>
        </Card>
      </div>

      {/* Form Fields */}
      <div className='flex-grow'>
        <h2 className='h2'>Name and description</h2>

        <Input
          isRequired
          size='lg'
          label='Name'
          placeholder='Analyzer Name'
          value={formData.name}
          className='mb-8'
          onChange={(e) => updateFormData("name", e.target.value)}
        />

        <Textarea
          size='lg'
          label='Description'
          placeholder='Analyzer Description'
          value={formData.description}
          className='mb-8'
          onChange={(e) => updateFormData("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
