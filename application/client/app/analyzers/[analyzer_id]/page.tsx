import api from "@/api_utils";

interface Props {
  params: { analyzer_id: string };
}

export default async function Analyzer({ params }: Props) {
  const analyzer = await api.getAnalyzer(Number(params.analyzer_id));
  const inputs = await api.getAnalyzer(Number(params.analyzer_id));
  const outputs = await api.getAnalyzer(Number(params.analyzer_id));
  return <>
  
  </>;
}
