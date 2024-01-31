import api from "@/api_utils";
import CodeDisplay from "./CodeDisplay";

export default async function AnalyzerScriptDisplay({
  analyzer_id,
}: {
  analyzer_id: number;
}) {
  const resp = await api.getAnalyzerScript(analyzer_id, {
    cache: "no-cache",
  });

  console.log(resp.status);
  if (resp.status !== 200) {
    return <>Something wrong</>;
  }

  return (
    <>
      {" "}
      <div className="flex-grow p-4">
        {resp.status === 200 ? (
          <CodeDisplay code_string={resp.data} />
        ) : (
          "Error: Database indicates that the analyzer has a script, but the script was not found on the server."
        )}
      </div>
    </>
  );
}
