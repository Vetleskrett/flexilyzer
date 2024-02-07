"use client";
import { AnalyzerSimplifiedResponse } from "@/extensions/data-contracts";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AnalyzerTabs({
  assignment_analyzers,
}: {
  assignment_analyzers: AnalyzerSimplifiedResponse[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentAnalyzerId = searchParams.get("analyzer");
  const currentAnalyzerIndex = assignment_analyzers.findIndex(
    (analyzer) => `${analyzer.id}` === currentAnalyzerId
  );

  const handleTabChange = (index: number) => {
    const selectedAnalyzerId = assignment_analyzers[index].id;
    // Create a new URLSearchParams object to update the search parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("analyzer", selectedAnalyzerId.toString());
    // Use router.push to update the URL with the new search parameters
    router.push(`${pathName}?${newSearchParams.toString()}`);
  };

  return "hei";
  // <Tabs
  //   key={"analyzer-tabs"}
  //   variant={"underlined"}
  //   aria-label="Analyzer Tabs"
  //   value={currentAnalyzerIndex !== null ? currentAnalyzerIndex : 0} // Default to the first tab if no matching analyzer is found
  // >
  //   {assignment_analyzers.map((analyzer) => (
  //     <Tab key={analyzer.id} title={analyzer.name} />
  //   ))}
  // </Tabs>
}
