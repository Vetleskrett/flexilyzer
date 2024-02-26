"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnalyzerSimplifiedResponse } from "@/extensions/data-contracts";
import { Tab, Tabs } from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import AnalyzerBatchSelect from "../reportPageComponents/AnalyzerBatchSelect";
import CompareModeSwitch from "../reportPageComponents/CompareModeSwitch";

export default function AnalyzerTabs({
  assignment_analyzers,
  course_id: _course_id,
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

  // Directly determine the selected analyzer ID from the search parameters
  const currentAnalyzerId =
    selectedAnalyzer || assignment_analyzers[0]?.id.toString(); // Default to first analyzer if none specified

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("batch");
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSelectionChange = (key: React.Key) => {
    // Update the URL with the new search parameters
    router.push(pathname + "?" + createQueryString("analyzer", key.toString()));
  };

  useEffect(() => {
    if (!selectedAnalyzer) {
      router.push(
        pathname +
          "?" +
          createQueryString("analyzer", assignment_analyzers[0]?.id.toString())
      );
    }
  }, [
    selectedAnalyzer,
    assignment_analyzers,
    pathname,
    createQueryString,
    router,
  ]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex flex-row">
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
            <div className="flex w-full flex-row items-center justify-center">
              <div className="flex flex-1 items-center justify-center">
                <CompareModeSwitch />
              </div>

              <div className="flex w-full max-w-[500px] flex-1 items-center justify-center md:w-[500px]">
                <AnalyzerBatchSelect assignment_id={assignment_id} />
              </div>

              <div className="flex flex-1 items-center justify-center"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
