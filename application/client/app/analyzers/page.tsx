import api from "@/utils/apiUtils";
import AnalyzerOverview from "@/components/analyzerComponents/AnalyzerOverview";
import CreateButton from "@/components/buttons/CreateButton";

export default async function Analyzers() {
  const analyzers = await api.getAllAnalyzers({ cache: "no-store" });

  return (
    <div>
      <div className='flex flex-row justify-between mx-4 mb-4'>
        <h2 className='h2'>All Analyzers:</h2>
        <CreateButton pushRoute={"/analyzers/new"} text={"Create Analyzer"} />
      </div>
      {analyzers.data.map((analyzer) => {
        return <AnalyzerOverview key={analyzer.id} analyzer={analyzer} />;
      })}
      <div className='flex flex-col items-center'></div>
    </div>
  );
}
