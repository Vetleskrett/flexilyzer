import BoolComponent from "@/components/reportComponents/boolComponent";
import RangeComponent from "@/components/reportComponents/rangeComponent";
import TextComponent from "@/components/reportComponents/textComponent";
import {
  AnalyzerOutputResponse,
  ReportResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import React from "react";

export const renderMetrics = (
  report: ReportResponse,
  outputs: AnalyzerOutputResponse[]
) => {
  if (!report.report) {
    return null; // If the report does not have any metrics, don't render anything.
  }

  const metrics = report.report as JSON; // Assuming this is a JSON object with key-value pairs.

  console.log(outputs);
  console.log(metrics);
  return Object.entries(metrics)
    .map(([keyName, value]) => {
      const metricMetadata = outputs.find((o) => o.key_name === keyName);

      if (!metricMetadata) {
        return null; // If there's no metadata for a metric, don't render a component.
      }

      switch (metricMetadata.value_type) {
        case ValueTypesOutput.Range:
          interface RangeMetadata {
            fromRange: number;
            toRange: number;
          }

          const extendedMetadata =
            metricMetadata.extended_metadata as unknown as RangeMetadata;

          // const extendedMetadata = JSON.parse(
          //   metricMetadata.extended_metadata || "{}"
          // );
          return (
            <RangeComponent
              key={keyName}
              keyName={keyName}
              value={value as number}
              fromValue={extendedMetadata.fromRange}
              toValue={extendedMetadata.toRange}
            />
          );
        case ValueTypesOutput.Str:
          return (
            <TextComponent
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              value={value as string}
            />
          );
        case ValueTypesOutput.Bool:
          return (
            <BoolComponent
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              value={value as boolean}
            />
          );
        case ValueTypesOutput.Int:
          return <>{keyName}</>;
        default:
          return null; // If the value_type is not recognized, don't render a component.
      }
    })
    .filter((component) => component !== null); // Filter out null values to avoid rendering issues.
};
