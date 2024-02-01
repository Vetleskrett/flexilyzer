import api from "@/api_utils";
import AnalyzerScriptDisplay from "@/components/analyzerComponents/AnalyzerScriptDisplay";
import AnalyzerSummary from "@/components/analyzerComponents/AnalyzerSummary";
import AnalyzerMissingScript from "@/components/analyzerComponents/AnalyzerMissingScript";

interface Props {
  params: { analyzer_id: string };
}

export default async function Analyzer({ params }: Props) {
  const analyzer = (
    await api.getAnalyzer(Number(params.analyzer_id), { cache: "no-cache" })
  ).data;
  const inputs = (await api.getAnalyzerInputs(Number(params.analyzer_id))).data;
  const outputs = (await api.getAnalyzerOutputs(Number(params.analyzer_id)))
    .data;
  return (
    <>
      <div className="flex justify-between p-4 pt-1 w-full">
        <div className="flex-grow max-w-50p p-4 text-center">
          <h2 className="h2">Summary</h2>
          <AnalyzerSummary
            analyzer={analyzer}
            inputs={inputs}
            outputs={outputs}
          />
        </div>
        <div className="flex-grow max-w-50p p-4">
          <h2 className="h2 text-center">Analyzer script</h2>
          {analyzer.has_script ? (
            <AnalyzerScriptDisplay analyzer_id={analyzer.id} />
          ) : (
            <>
              <div className="flex justify-center items-start mt-4">
                <AnalyzerMissingScript
                  analyzer={analyzer}
                  inputs={inputs}
                  outputs={outputs}
                />
              </div>
            </>
          )}
          {/* <Suspense fallback={<Spinner />}>
            <CodeTemplate formData={formData} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
}
