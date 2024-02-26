import api from "@/utils/apiUtils";
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

  const script = analyzer.has_script
    ? await api.getAnalyzerScript(Number(params.analyzer_id), {
        cache: "no-cache",
      })
    : null;

  const requirements = analyzer.has_requirements
    ? await api.getAnalyzerRequirements(Number(params.analyzer_id), {
        cache: "no-cache",
      })
    : null;

  return (
    <>
      <div className='flex w-full justify-between p-4 pt-1'>
        <div className='max-w-50p grow p-4 text-center'>
          <h2 className='h2'>Summary</h2>
          <AnalyzerSummary
            analyzer={analyzer}
            inputs={inputs}
            outputs={outputs}
          />
        </div>
        <div className='max-w-50p grow p-4'>
          <h2 className='h2 text-center'>Analyzer</h2>
          {analyzer.has_script ? (
            <div className='mt-4 flex items-start justify-center'>
              <AnalyzerScriptDisplay
                analyzer_id={analyzer.id}
                script={script ? script?.data : null}
                has_requirements={
                  analyzer.has_requirements ? analyzer.has_requirements : false
                }
                requirements={requirements ? requirements?.data : null}
              />
            </div>
          ) : (
            <>
              <div className='mt-4 flex items-start justify-center'>
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
