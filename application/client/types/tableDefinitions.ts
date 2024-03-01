import { ValueTypesOutput } from "@/extensions/data-contracts";
import { AnalyzerWithOutputs, TeamReports } from "./analyzerDefinitions";

export interface OverviewTableParams {
  analyzersWithOutputs: AnalyzerWithOutputs[];
  allReports: TeamReports;
}

export type FlatMappedOutputs = {
  analyzerId: number;
  key_name: string;
  value_type: ValueTypesOutput;
  display_name?: string | null | undefined;
  extended_metadata?: null | undefined;
  id: number;
};

export interface FilterState {
  [key: string]: {
    value_type: ValueTypesOutput;
    boolValue?: boolean;
    intValue?: { min?: number; max?: number };
  };
}
