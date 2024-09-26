import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { RangeMetadataCertain } from "@/types/analyzerDefinitions";
import { FlatMappedOutputs } from "@/types/tableDefinitions";
import { formatter, isExtendedValueObj } from "@/utils/formatUtils";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { Progress } from "@nextui-org/react";
import { TooltipWrapper } from "../TooltipWrapper";

export const render = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  valueType: ValueTypesOutput,
  extendedMetadata: null | undefined,
  desc: string | undefined,
  keyName: string,
  course_id: number,
  assignment_id: number,
  team_id: number,
  batch_id: number
) => {
  switch (valueType) {
    case ValueTypesOutput.Range:
      const extended = extendedMetadata as unknown as RangeMetadataCertain;
      return (
        <TooltipWrapper
          desc={
            <div className="flex flex-col justify-center space-y-2 py-2 text-center">
              <div className="text-sm">
                {value} / {extended.toRange}
              </div>
              {desc ? <div className="text-xs font-light">{desc}</div> : ""}
            </div>
          }
        >
          <Progress
            aria-label={"Progress bar"}
            size="md"
            value={value as number}
            minValue={extended.fromRange}
            maxValue={extended.toRange}
            color={
              (value as number) / extended.toRange > 0.65
                ? "success"
                : "warning"
            }
            className="max-w-md"
          />
        </TooltipWrapper>
      );

    case ValueTypesOutput.Str:
      return (
        <TooltipWrapper desc={desc}>
          <div className="text-xs">{value as string}</div>
        </TooltipWrapper>
      );

    case ValueTypesOutput.Date:
      return (
        <TooltipWrapper desc={desc}>
          <div className="text-xs">{standardTimeFormatter(value as Date)}</div>
        </TooltipWrapper>
      );

    case ValueTypesOutput.Bool:
      return (
        <TooltipWrapper desc={desc}>
          <div
            className={`w-[45px] rounded-full px-2 py-1 text-center text-xs text-white ${
              value ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {value.toString()}
          </div>
        </TooltipWrapper>
      );

    case ValueTypesOutput.Int:
      return (
        <TooltipWrapper desc={desc}>
          <div className="text-xs">{formatter.format(value as number)}</div>
        </TooltipWrapper>
      );

    case ValueTypesOutput.File:
      const href = `${process.env.externalApiUrl}/api/v1/courses/${course_id}/assignments/${assignment_id}/teams/${team_id}/projects/reports/batch/${batch_id}/${keyName}`;
      return (
        <TooltipWrapper desc={value.desc}>
        <a href={href} target="_blank" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
          {value as string}
          <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </TooltipWrapper>
      );

    default:
      return <>N/A</>;
  }
};

const renderCell = (
  item: ReportTeamResponse[],
  columnKey: string,
  flatMappedOutputs: FlatMappedOutputs[],
  course_id: number,
  assignment_id: number,
) => {
  const [name, id] = columnKey.split("-");

  // TODO: add tooltip for team with the team's input params
  if (name === "Team") return item[0].team_id;

  const report = item.find(
    (r: ReportTeamResponse) => r.analyzer_id === Number(id),
  );
  const value = report ? report.report[name] : undefined;
  const outputDef = flatMappedOutputs.find(
    (o) => o.analyzerId === Number(id) && o.key_name === name,
  );

  if (!outputDef || value === undefined) return <p className="font-light">-</p>;

  return isExtendedValueObj(value)
    ? render(
        value.value,
        outputDef.value_type,
        outputDef.extended_metadata,
        value.desc,
        name,
        course_id,
        assignment_id,
        report!.team_id,
        report!.batch_id
      )
    : render(
      value, 
      outputDef.value_type, 
      outputDef.extended_metadata,
      undefined,
      name,
      course_id,
      assignment_id,
      report!.team_id,
      report!.batch_id
    );
};

export { renderCell };
