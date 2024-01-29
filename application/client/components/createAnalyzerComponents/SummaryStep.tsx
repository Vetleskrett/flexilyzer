import {
  FormDataT,
  InputParameter,
  OutputParameter,
  SummaryStepProps,
} from "@/app/types/analyzerDefinitions";
import { Button, Card, Kbd } from "@nextui-org/react";
import { useState } from "react";
import CodeTemplate from "./CodeTemplate";

export default function SummaryStep({
  formData,
  setFormData,
}: SummaryStepProps) {
  const [codeTemplate, setCodeTemplate] = useState<string | undefined>(
    `
def hello_world():
  print("Hello, world!")

hello_world()
  `
  );

  const renderParameter = (param: InputParameter | OutputParameter) => {
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
  };

  return (
    <>
      <div className="flex justify-between p-4 pt-1 w-full">
        <div className="flex-grow max-w-50p p-4 text-center">
          <h2 className="h2">Summary</h2>
          <Card className="mb-5 p-3">
            <h3 className="h3">{formData.name}</h3>
            <p>{formData.description}</p>
          </Card>

          <Card className="mb-5 p-3">
            <h3 className="h3">Input Parameters</h3>
            {formData.input_parameters.map((param, index) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>

          <Card className="p-3">
            <h3 className="h3">Output Parameters</h3>
            {formData.output_parameters.map((param, index) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>
        </div>
        <div className="flex-grow p-4">
          <h2 className="h2 text-center">Analyzer template</h2>

          {codeTemplate ? (
            <CodeTemplate codeTemplate={codeTemplate} />
          ) : (
            <Button>Generate template</Button>
          )}
        </div>
      </div>
    </>
  );
}
