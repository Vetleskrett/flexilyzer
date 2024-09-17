import { getAnalyzer, getAnalyzerScript, getAnalyzerRequirements, getAnalyzerInputs, getAnalyzerOutputs } from "@/utils/apiUtils";
import AnalyzerScriptDisplay from "@/components/analyzerComponents/AnalyzerScriptDisplay";
import AnalyzerSummary from "@/components/analyzerComponents/AnalyzerSummary";
import AnalyzerMissingScript from "@/components/analyzerComponents/AnalyzerMissingScript";

interface Props {
  params: { analyzer_id: string };
}

export default async function Analyzer({ params }: Props) {
  const analyzer = await getAnalyzer(Number(params.analyzer_id));
  const inputs = await getAnalyzerInputs(Number(params.analyzer_id));
  const outputs = await getAnalyzerOutputs(Number(params.analyzer_id));

  const script = analyzer.has_script
    ? await getAnalyzerScript(Number(params.analyzer_id))
    : null;

  const requirements = analyzer.has_requirements
    ? await getAnalyzerRequirements(Number(params.analyzer_id))
    : null;

  return (
    <>
      <div className="flex w-full justify-between p-4 pt-1">
        <div className="max-w-50p grow p-4 text-center">
          <h2 className="h2">Summary</h2>
          <AnalyzerSummary
            analyzer={analyzer}
            inputs={inputs}
            outputs={outputs}
          />
        </div>
        <div className="max-w-50p grow p-4">
          <h2 className="h2 text-center">Analyzer</h2>
          {analyzer.has_script ? (
            <div className="mt-4 flex items-start justify-center">
              <AnalyzerScriptDisplay
                analyzer_id={analyzer.id}
                script={script ? script : null}
                has_requirements={
                  analyzer.has_requirements ? analyzer.has_requirements : false
                }
                requirements={requirements ? requirements : null}
              />
            </div>
          ) : (
            <>
              <div className="mt-4 flex items-start justify-center">
                <AnalyzerMissingScript
                  analyzer={analyzer}
                  inputs={inputs}
                  outputs={outputs}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
