import { AnalyzerCreate } from "@/extensions/data-contracts";
import {
  FormDataT,
  InputParameter,
  OutputParameter,
} from "@/types/analyzerDefinitions";
import { Kbd } from "@nextui-org/react";

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
      display_name: e.display_name ? e.display_name : null,
      extended_metadata: e.extended_metadata ? JSON.stringify(e.extended_metadata) : null,
    })),
  };

  return data;
}

export function renderParameter(
  param: InputParameter | OutputParameter
): React.ReactNode {
  switch (param.value_type) {
    case "string":
    case "number":
    case "boolean":
      return (
        <p>
          <b>{param.key_name}</b>: <Kbd>{param.value_type}</Kbd>
        </p>
      );
    case "range":
      // Here, check if the parameter is an OutputParameter and has extended_metadata
      if ("extended_metadata" in param && param.extended_metadata) {
        return (
          <div>
            <p>
              <b>{param.key_name}</b>:{" "}
              <Kbd>
                number, range ({param.extended_metadata.from_value} -{" "}
                {param.extended_metadata.to_value})
              </Kbd>
            </p>
          </div>
        );
      }
      return <p>{param.key_name}: Range (No data)</p>;
    default:
      return null;
  }
}
