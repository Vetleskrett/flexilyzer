import { FormDataT } from "@/types/analyzerDefinitions";
import { Card, Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import CodeTemplate from "./CodeTemplate";
import { renderParameter } from "../analyzerComponents/analyzerUtils";

export default function SummaryStep({ formData }: { formData: FormDataT }) {
  return (
    <>
      <div className="flex w-full justify-between p-4 pt-1">
        <div className="max-w-50p grow p-4 text-center">
          <h2 className="h2">Summary</h2>
          <Card className="mb-5 p-3">
            <h3 className="h3">{formData.name}</h3>
            <p>{formData.description}</p>
          </Card>

          <Card className="mb-5 p-3">
            <h3 className="h3">Input Parameters</h3>
            {formData.inputs.map((param) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>

          <Card className="p-3">
            <h3 className="h3">Output Parameters</h3>
            {formData.outputs.map((param) => (
              <>{renderParameter(param)}</>
            ))}
          </Card>
        </div>
        <div className="grow justify-center p-4">
          <h2 className="h2 text-center">Analyzer template</h2>
          <Suspense fallback={<Spinner />}>
            <CodeTemplate formData={formData} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
