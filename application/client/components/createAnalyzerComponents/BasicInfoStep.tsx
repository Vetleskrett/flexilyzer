import { Input, Textarea } from "@nextui-org/react"; // Assuming Next UI components

import { SummaryStepProps } from "@/types/analyzerDefinitions";

const BasicInfoStep = ({ formData, setFormData }: SummaryStepProps) => {
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <h2 className='h2'>Basic Info</h2>
      <Input
        isRequired
        size='lg'
        label='Name'
        placeholder='Analyzer Name'
        value={formData.name}
        className='max-w-xs mb-8'
        onChange={(e) => updateFormData("name", e.target.value)}
      />

      <Textarea
        fullWidth
        size='lg'
        label='Description'
        value={formData.description}
        placeholder='Analyzer Description'
        className='max-w-xs'
        onChange={(e) => updateFormData("description", e.target.value)}
      />
    </>
  );
};

export default BasicInfoStep;
