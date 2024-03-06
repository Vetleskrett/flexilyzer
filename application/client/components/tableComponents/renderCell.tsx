import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { RangeMetadataCertain } from "@/types/analyzerDefinitions";
import { FlatMappedOutputs } from "@/types/tableDefinitions";
import { formatter } from "@/utils/formatUtils";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { Tooltip, Progress } from "@nextui-org/react";

type ExtendedValueObj = {
  value: string | number | boolean | Date;
  desc: string;
};

// Type guard for ExtendedValueObj
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isExtendedValueObj = (value: any): value is ExtendedValueObj => {
  return (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "desc" in value &&
    typeof value.desc === "string"
  );
};

type TooltipWrapperProps = {
  desc: JSX.Element | string | undefined;
  children: JSX.Element;
};

export const TooltipWrapper = ({ desc, children }: TooltipWrapperProps) => {
  return desc ? (
    <Tooltip delay={0} closeDelay={0} content={desc} placement="right">
      {children}
    </Tooltip>
  ) : (
    children
  );
};

export const render = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  valueType: ValueTypesOutput,
  extendedMetadata?: null,
  desc?: string,
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

    default:
      return <>N/A</>;
  }
};

const renderCell = (
  item: ReportTeamResponse[],
  columnKey: string,
  flatMappedOutputs: FlatMappedOutputs[],
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

  console.log(value.desc);
  return isExtendedValueObj(value)
    ? render(
        value.value,
        outputDef.value_type,
        outputDef.extended_metadata,
        value.desc,
      )
    : render(value, outputDef.value_type, outputDef.extended_metadata);
};

export { renderCell };
