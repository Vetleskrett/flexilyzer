"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnalyzerSimplifiedResponse } from "@/extensions/data-contracts";
import { Tab, Tabs } from "@nextui-org/react";
import { useCallback } from "react";
import AnalyzerBatchSelect from "./AnalyzerBatchSelect";

export default function AnalyzerTabs({
  assignment_analyzers,
  course_id,
  assignment_id,
}: {
  assignment_analyzers: AnalyzerSimplifiedResponse[];
  course_id: number;
  assignment_id: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedAnalyzer = searchParams.get("analyzer");
  const selectedBatchId = searchParams.get("batch");

  // Directly determine the selected analyzer ID from the search parameters
  const currentAnalyzerId =
    selectedAnalyzer || assignment_analyzers[0]?.id.toString(); // Default to first analyzer if none specified

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSelectionChange = (key: React.Key) => {
    // Update the URL with the new search parameters
    router.push(pathname + "?" + createQueryString("analyzer", key.toString()));
  };

  if (!selectedAnalyzer) {
    router.push(
      pathname +
        "?" +
        createQueryString("analyzer", assignment_analyzers[0]?.id.toString())
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row mb-4">
          <Tabs
            aria-label="Analyzer Tabs"
            selectedKey={currentAnalyzerId}
            onSelectionChange={handleSelectionChange}
            variant="underlined"
          >
            {assignment_analyzers.map((analyzer) => (
              <Tab
                key={analyzer.id.toString()}
                title={analyzer.name}
                value={analyzer.id.toString()}
              />
            ))}
          </Tabs>
        </div>
        {selectedAnalyzer && (
          <>
            <div className="flex flex-row justify-center items-center w-[300px]">
              <AnalyzerBatchSelect
                course_id={course_id}
                assignment_id={assignment_id}
              />
            </div>
          </>
        )}
        
      </div>
    </>
  );
}
