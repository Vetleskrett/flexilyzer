import { AnalyzerOutputResponse, ReportTeamResponse, ValueTypesInput, ValueTypesOutput } from "@/extensions/data-contracts";

export type InputParameter = {
  id: string;
  key_name: string;
  value_type: ValueTypesInput;
};

export type RangeMetadata = {
  fromRange: number | undefined;
  toRange: number | undefined;
};

export type OutputParameter = {
  id: string;
  key_name: string;
  value_type: ValueTypesOutput;
  display_name: string;
  extended_metadata?: RangeMetadata;
};

export type FormDataT = {
  name: string;
  description: string;
  inputs: InputParameter[];
  outputs: OutputParameter[];
};

export interface SummaryStepProps {
  formData: FormDataT;
  setFormData: React.Dispatch<React.SetStateAction<FormDataT>>;
}

export type AnalyzerWithOutputs = {
  id: number;
  analyzer_name: string;
  outputs: AnalyzerOutputResponse[];
};

export type TeamReports = {
  [team_id: number]: {
    reports: ReportTeamResponse[];
  };
};
