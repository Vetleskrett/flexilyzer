"use client";
import {
  AnalyzerInputResponse,
  AnalyzerOutputResponse,
  AnalyzerSimplifiedResponse,
} from "@/extensions/data-contracts";
import { Card } from "@nextui-org/react";
import { renderParameter } from "./analyzerUtils";
import { Suspense } from "react";

export default function AnalyzerMetadata({
  analyzer,
  inputs,
  outputs,
}: {
  analyzer: AnalyzerSimplifiedResponse;
  inputs: AnalyzerInputResponse[];
  outputs: AnalyzerOutputResponse[];
}) {
  console.log(outputs);
  return (
    <>
      <div className="flex justify-between p-4 pt-1 w-full">
        <div className="flex-grow max-w-50p p-4 text-center">
          <h2 className="h2">Summary</h2>
          <Card className="mb-5 p-3">
            <h3 className="h3">{analyzer.name}</h3>
            <p>{analyzer.description}</p>
          </Card>

          <Card className="mb-5 p-3">
            <h3 className="h3">Input Parameters</h3>
            {inputs.map((param, index) => (
              <>
                {renderParameter({
                  id: param.id.toString(),
                  key_name: param.key_name,
                  value_type: param.value_type,
                })}
              </>
            ))}
          </Card>

          <Card className="p-3">
            <h3 className="h3">Output Parameters</h3>
            {outputs.map((param, index) => (
              <>
                {renderParameter({
                  id: param.id.toString(),
                  key_name: param.key_name,
                  value_type: param.value_type,
                })}
              </>
            ))}
          </Card>
        </div>
        <div className="flex-grow p-4">
          <h2 className="h2 text-center">Analyzer template</h2>
          {/* <Suspense fallback={<Spinner />}>
            <CodeTemplate formData={formData} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
}
