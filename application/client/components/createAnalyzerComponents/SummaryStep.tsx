import {
  FormDataT,
  InputParameter,
  OutputParameter,
  SummaryStepProps,
} from "@/types/analyzerDefinitions";
import { Button, Card, Kbd, Spinner } from "@nextui-org/react";
import { Suspense, useState } from "react";
import CodeTemplate from "./CodeTemplate";
import api from "@/api_utils";
import { AnalyzerCreate } from "@/extensions/data-contracts";
import { renderParameter } from "../analyzerComponents/analyzerUtils";

export default function SummaryStep({ formData }: { formData: FormDataT }) {
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
            {formData.inputs.map((param, index) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>

          <Card className="p-3">
            <h3 className="h3">Output Parameters</h3>
            {formData.outputs.map((param, index) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>
        </div>
        <div className="flex-grow p-4 justify-center">
          <h2 className="h2 text-center">Analyzer template</h2>
          <Suspense fallback={<Spinner />}>
            <CodeTemplate formData={formData} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
