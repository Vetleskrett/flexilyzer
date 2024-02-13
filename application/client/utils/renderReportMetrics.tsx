"use client";
import BoolComponent from "@/components/reportComponents/boolComponent";
import RangeComponent from "@/components/reportComponents/rangeComponent";
import TextComponent from "@/components/reportComponents/textComponent";
import { ReportResponse } from "@/extensions/data-contracts";

export const renderMetrics = (report: ReportResponse) => {
  if (!report.report) {
    return <>Report object contains no actual report</>;
  }
  const json_report = JSON.stringify(report.report);

  console.log(report.report.performance);

  // Fetch analyzer outputs here:

  // useQuery ...

  // Old code, needs to be modified to work with new types:

  //   const metadata = metric_metadata[report.analyzer]; // Find the corresponding metadata.

  //   return Object.entries(metrics).map(([keyName, value]) => {
  //     const metricMetadata = metadata.find((m: any) => m.key_name === keyName);

  //     if (!metricMetadata) {
  //       return null; // If there's no metadata for a metric, don't render a component.
  //     }

  //     switch (metricMetadata.value_type) {
  //       case "range":
  //         const extendedMetadata = JSON.parse(metricMetadata.extended_metadata);
  //         return (
  //           <RangeComponent
  //             keyName={keyName}
  //             value={value as number}
  //             fromValue={extendedMetadata.fromRange}
  //             toValue={extendedMetadata.toRange}
  //           />
  //         );
  //       case "text":
  //         return <TextComponent keyName={keyName} value={value as string} />;
  //       case "bool":
  //         return <BoolComponent keyName={keyName} value={value as boolean} />;
  //       default:
  //         return null; // If the value_type is not recognized, don't render a component.
  //     }
  //   });
};
