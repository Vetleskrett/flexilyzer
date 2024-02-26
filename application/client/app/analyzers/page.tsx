import api from "@/utils/apiUtils";
import AnalyzerOverview from "@/components/analyzerComponents/AnalyzerOverview";
import { CreateButton } from "@/components/buttons";

export default async function Analyzers() {
  const analyzers = await api.getAllAnalyzers({ cache: "no-store" });

  return (
    <div>
      <h2 className='h2'>All Analyzers:</h2>
      {analyzers.data.map((analyzer) => {
        return <AnalyzerOverview key={analyzer.id} analyzer={analyzer} />;
      })}
      <div className='flex flex-col items-center'>
        <CreateButton pushRoute={"/analyzers/new"} text={"New Analyzer"} />
      </div>
    </div>
  );
}
