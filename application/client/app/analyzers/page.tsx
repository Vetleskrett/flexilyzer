import api from "@/api_utils";
import AnalyzerOverview from "@/components/analyzerComponents/AnalyzerOverview";
import { CreateAnalyzerButton } from "@/components/buttons";
import { useRouter } from "next/navigation";

export default async function Analyzers() {
  const analyzers = await api.getAllAnalyzers();

  console.log(analyzers);
  return (
    <div>
      <h2 className="h2">All Analyzers:</h2>
      {analyzers.data.map((analyzer) => {
        return <AnalyzerOverview analyzer={analyzer} />;
      })}
      <div className="flex flex-col items-center mt-30">
        <CreateAnalyzerButton />
      </div>
    </div>
  );
}
