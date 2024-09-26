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
import { render } from "../tableComponents/renderCell";
import { ReportCard } from "./ReportCard";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { TrueFalseDistributionChips } from "./TrueFalseDistributionChips";
import { isExtendedValueObj } from "@/utils/formatUtils";
import { RangeComponent } from "./rangeComponent";

export const renderMetrics = (
  report: ReportResponse,
  outputs: AnalyzerOutputResponse[],
  batchStats: BatchStatsResponse | undefined,
  course_id: number,
  assignment_id: number,
  team_id: number,
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
            <RangeComponent
              desc={isExtendedValueObj(value) ? value.desc : undefined}
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
          );
        case ValueTypesOutput.Str:
          return (
            <ReportCard
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
            >
              {isExtendedValueObj(value)
                ? render(
                    value.value,
                    metricMetadata.value_type,
                    undefined,
                    value.desc,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
                : render(
                    value,
                    metricMetadata.value_type,
                    undefined,
                    undefined,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
              }
            </ReportCard>
          );
        case ValueTypesOutput.Bool:
          const boolMetric = batchMetric as DistributionMetric;
          return (
            <ReportCard
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              avgValue={
                boolMetric && (
                  <TrueFalseDistributionChips
                    truePercent={boolMetric?.distribution.true.toPrecision(2)}
                    falsePercent={boolMetric?.distribution.false.toPrecision(2)}
                  />
                )
              }
            >
              {isExtendedValueObj(value)
                ? render(
                    value.value,
                    metricMetadata.value_type,
                    undefined,
                    value.desc,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
                : render(
                    value,
                    metricMetadata.value_type,
                    undefined,
                    undefined,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
              }
            </ReportCard>
          );
        case ValueTypesOutput.Int:
          const intAvgMetric = batchMetric as AvgMetric;
          console.log(intAvgMetric);
          return (
            <ReportCard
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              avgValue={intAvgMetric && intAvgMetric.avg?.toFixed(0)}
            >
              {isExtendedValueObj(value)
                ? render(
                    value.value,
                    metricMetadata.value_type,
                    undefined,
                    value.desc,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
                : render(
                    value,
                    metricMetadata.value_type,
                    undefined,
                    undefined,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
              }
            </ReportCard>
          );
        case ValueTypesOutput.Date:
          const dateAvgMetric = batchMetric as DateAvgMetric;
          return (
            <ReportCard
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
              avgValue={
                dateAvgMetric &&
                standardTimeFormatter(new Date(dateAvgMetric.avg!))
              }
            >
              {isExtendedValueObj(value)
                ? render(
                    value.value,
                    metricMetadata.value_type,
                    undefined,
                    value.desc,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
                : render(
                    value,
                    metricMetadata.value_type,
                    undefined,
                    undefined,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
              }
            </ReportCard>
          );
        case ValueTypesOutput.File:
          return (
            <ReportCard
              key={keyName}
              keyName={
                metricMetadata.display_name
                  ? metricMetadata.display_name
                  : keyName
              }
            >
              {isExtendedValueObj(value)
                ? render(
                    value.value,
                    metricMetadata.value_type,
                    undefined,
                    value.desc,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
                : render(
                    value,
                    metricMetadata.value_type,
                    undefined,
                    undefined,
                    keyName,
                    course_id,
                    assignment_id,
                    team_id,
                    report.batch_id
                  )
              }
            </ReportCard>
          );
        default:
          return null;
      }
    })
    .filter((component) => component !== null);
};
