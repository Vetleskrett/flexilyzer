import api from "@/api_utils";
import AnalyzerMetadata from "@/components/analyzerComponents/AnalyzerMetadata";
import { Card } from "@nextui-org/react";

interface Props {
  params: { analyzer_id: string };
}

export default async function Analyzer({ params }: Props) {
  const analyzer = (await api.getAnalyzer(Number(params.analyzer_id))).data;
  const inputs = (await api.getAnalyzerInputs(Number(params.analyzer_id))).data;
  const outputs = (await api.getAnalyzerOutputs(Number(params.analyzer_id)))
    .data;
  return (
    <>
      <h2 className="h2">{analyzer.name}</h2>
      {analyzer.creator ? analyzer.creator : ""}
      <AnalyzerMetadata analyzer={analyzer} inputs={inputs} outputs={outputs} />
    </>
  );
}
