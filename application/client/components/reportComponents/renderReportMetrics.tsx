import { BoolComponent } from "@/components/reportComponents/BoolComponent";
import { IntComponent } from "@/components/reportComponents/IntComponent";
import { RangeComponent } from "@/components/reportComponents/RangeComponent";
import { TextComponent } from "@/components/reportComponents/TextComponent";
import { DateComponent } from "@/components/reportComponents/DateComponent";

import {
  AnalyzerOutputResponse,
  BatchStatsResponse,
  ReportResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import {
  AvgMetric,
  DateAvgMetric,
  DistributionMetric,
} from "@/types/componentDefinitions";
import React from "react";
import { RangeMetadataCertain } from "@/types/analyzerDefinitions";
import {
  TooltipWrapper,
  isExtendedValueObj,
  render,
} from "../tableComponents/renderCell";

export const renderMetrics = (
  report: ReportResponse,
  outputs: AnalyzerOutputResponse[],
  batchStats: BatchStatsResponse | undefined,
) => {
  if (!report.report) {
    return null; // If the report does not have any metrics, don't render anything.
  }

  const metrics = report.report as JSON; // Assuming this is a JSON object with key-value pairs.

  return Object.entries(metrics)
    .map(([keyName, value]) => {
      const metricMetadata = outputs.find((o) => o.key_name === keyName);

      if (!metricMetadata) {
        return null; // If there's no metadata for a metric, don't render a component.
      }

      const batchMetric = batchStats?.stats[keyName];

      switch (metricMetadata.value_type) {
        case ValueTypesOutput.Range:
          const extendedMetadata =
            metricMetadata.extended_metadata as unknown as RangeMetadataCertain;

          const avgMetric = batchMetric as AvgMetric;
          return (
            <TooltipWrapper
              desc={isExtendedValueObj(value) ? value.desc : undefined}
            >
              <RangeComponent
                key={keyName}
                keyName={
                  metricMetadata.display_name
                    ? metricMetadata.display_name
                    : keyName
                }
                value={
                  isExtendedValueObj(value)
                    ? (value.value as number)
                    : (value as number)
                }
                fromValue={extendedMetadata.fromRange}
                toValue={extendedMetadata.toRange}
                avg={avgMetric}
              />
            </TooltipWrapper>
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
              value={
                isExtendedValueObj(value)
                  ? render(
                      value.value,
                      metricMetadata.value_type,
                      undefined,
                      value.desc,
                    )
                  : render(value, metricMetadata.value_type, undefined)
              }
            />
          );
        case ValueTypesOutput.Bool:
          const boolMetric = batchMetric as DistributionMetric;
          return (
            <BoolComponent
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              value={
                isExtendedValueObj(value)
                  ? render(
                      value.value,
                      metricMetadata.value_type,
                      undefined,
                      value.desc,
                    )
                  : render(value, metricMetadata.value_type)
              }
              distribution={boolMetric?.distribution}
            />
          );
        case ValueTypesOutput.Int:
          const intAvgMetric = batchMetric as AvgMetric;
          return (
            <IntComponent
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              value={
                isExtendedValueObj(value)
                  ? render(
                      value.value,
                      metricMetadata.value_type,
                      undefined,
                      value.desc,
                    )
                  : render(value, metricMetadata.value_type)
              }
              avg={intAvgMetric}
            />
          );
        case ValueTypesOutput.Date:
          const dateAvgMetric = batchMetric as DateAvgMetric;
          return (
            <DateComponent
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              value={
                isExtendedValueObj(value)
                  ? render(
                      value.value,
                      metricMetadata.value_type,
                      undefined,
                      value.desc,
                    )
                  : render(value, metricMetadata.value_type)
              }
              avg={dateAvgMetric}
            />
          );
        default:
          return null; // If the value_type is not recognized, don't render a component.
      }
    })
    .filter((component) => component !== null); // Filter out null values to avoid rendering issues.
};
