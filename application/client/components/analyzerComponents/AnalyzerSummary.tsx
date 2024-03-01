"use client";
import {
  AnalyzerSimplifiedResponse,
  AnalyzerInputResponse,
  AnalyzerOutputResponse,
} from "@/extensions/data-contracts";
import { Card } from "@nextui-org/react";
import { renderParameter } from "./analyzerUtils";

export default function AnalyzerSummary({
  analyzer,
  inputs,
  outputs,
}: {
  analyzer: AnalyzerSimplifiedResponse;
  inputs: AnalyzerInputResponse[];
  outputs: AnalyzerOutputResponse[];
}) {
  return (
    <>
      <Card className="mb-5 p-3">
        <h3 className="h3">{analyzer.name}</h3>
        <p>{analyzer.description}</p>
      </Card>

      <Card className="mb-5 p-3">
        <h3 className="h3">Input Parameters</h3>
        {inputs.map((param) => (
          <div key={param.id}>
            {renderParameter({
              id: param.id.toString(),
              key_name: param.key_name,
              value_type: param.value_type,
            })}
          </div>
        ))}
      </Card>

      <Card className="p-3">
        <h3 className="h3">Output Parameters</h3>
        {outputs.map((param) => (
          <div key={param.id}>
            {renderParameter({
              id: param.id.toString(),
              key_name: param.key_name,
              value_type: param.value_type,
              display_name: param.display_name ? param.display_name : "",
              extended_metadata: param.extended_metadata
                ? param.extended_metadata
                : undefined,
            })}
          </div>
        ))}
      </Card>
    </>
  );
}
