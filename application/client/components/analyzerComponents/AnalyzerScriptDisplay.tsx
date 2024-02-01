import api from "@/api_utils";
import CodeDisplay from "./CodeDisplay";
import { ReactElement } from "react";

// Define the function as async but ensure it catches errors internally
export default async function AnalyzerScriptDisplay({
  analyzer_id,
}: {
  analyzer_id: number;
}): Promise<ReactElement> {
  try {
    const resp = await api.getAnalyzerScript(analyzer_id, {
      cache: "no-cache",
    });

    // Log status for debugging
    console.log(resp.status);

    // Check for a successful response
    if (resp.status !== 200) {
      // Return a user-friendly message or component
      return <div>Something went wrong</div>;
    }

    // If the response is successful, proceed to render the component
    return (
      <div className="flex-grow p-4">
        <CodeDisplay code_string={resp.data} />
      </div>
    );
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Handle the case where the fetch fails, such as a network error or 404 not found
    return (
      <div className="flex justify-center bg-red-500 pt-8 pb-8 mr-8 ml-8 rounded-xl text-white">
        Something went wrong while trying to fetch script
      </div>
    );
  }
}
