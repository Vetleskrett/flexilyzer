import { AnalyzerCreate, AnalyzerResponse } from "@/extensions/data-contracts";
import {
  FormDataT,
  InputParameter,
  OutputParameter,
} from "@/types/analyzerDefinitions";
import { pythonTypesMap } from "@/utils/valueTypesMapping";
import { Kbd } from "@nextui-org/react";

export function formatAnalyzerData(formData: FormDataT | AnalyzerResponse) {
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
      display_name: e.display_name ? e.display_name : null,
      extended_metadata: e.extended_metadata
        ? JSON.stringify(e.extended_metadata)
        : null,
    })),
  };
  return data;
}

export function renderParameter(
  param: InputParameter | OutputParameter,
): React.ReactNode {
  switch (param.value_type) {
    case "range":
      // Here, check if the parameter has extended_metadata
      if ("extended_metadata" in param && param.extended_metadata) {
        return (
          <div key={param.id}>
            <p>
              <b>{param.key_name}</b>:{" "}
              <Kbd>
                {pythonTypesMap[param.value_type].pythonType} (range:{" "}
                {param.extended_metadata.fromRange} -{" "}
                {param.extended_metadata.toRange})
              </Kbd>
            </p>
          </div>
        );
      }
      return <p>{param.key_name}: Range (No data)</p>;
    default:
      return (
        <div key={param.id}>
          <p>
            <b>{param.key_name}</b>:{" "}
            <Kbd>{pythonTypesMap[param.value_type].pythonType}</Kbd>
          </p>
        </div>
      );
  }
}
