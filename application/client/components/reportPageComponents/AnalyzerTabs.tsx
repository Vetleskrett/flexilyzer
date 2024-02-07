"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnalyzerSimplifiedResponse } from "@/extensions/data-contracts";
import { Tab, Tabs } from "@nextui-org/react";
import { useCallback } from "react";

export default function AnalyzerTabs({
  assignment_analyzers,
}: {
  assignment_analyzers: AnalyzerSimplifiedResponse[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Directly determine the selected analyzer ID from the search parameters
  const currentAnalyzerId =
    searchParams.get("analyzer") || assignment_analyzers[0]?.id.toString(); // Default to first analyzer if none specified

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

  return (
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
  );
}
