import { AnalyzerCreate } from "@/extensions/data-contracts";
import { FormDataT } from "@/types/analyzerDefinitions";

export function formatAnalyzerData(formData: FormDataT) {
    const data: AnalyzerCreate = {
      name: formData.name,
      description: formData.description,
      inputs: formData.inputs.map((e) => ({
        key_name: e.key_name,
        value_type: e.value_type,
      })),
      outputs: formData.outputs.map((e) => ({
        key_name: e.key_name,
        value_type: e.value_type,
      })),
    };
    return data;
  }