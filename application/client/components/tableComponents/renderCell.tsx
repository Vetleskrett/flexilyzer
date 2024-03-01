import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { FlatMappedOutputs } from "@/types/tableDefinitions";
import { formatter } from "@/utils/formatUtils";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { Tooltip, Progress } from "@nextui-org/react";
import { SmallBool } from "@/components/tableComponents/SmallBoolChip";

type ExtendedValueObj = {
  value: string | number | boolean | Date;
  desc: string;
};

// Type guard for ExtendedValueObj
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isExtendedValueObj = (value: any): value is ExtendedValueObj => {
  return (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "desc" in value &&
    typeof value.desc === "string"
  );
};

type TooltipWrapperProps = {
  desc: string | undefined;
  children: JSX.Element;
};

const TooltipWrapper = ({ desc, children }: TooltipWrapperProps) => {
  return desc ? (
    <Tooltip delay={0} closeDelay={0} content={desc}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (value: any, outputDef: FlatMappedOutputs, desc?: string) => {
  switch (outputDef.value_type) {
    case ValueTypesOutput.Range:
      const extendedMetadata = outputDef.extended_metadata as unknown as {
        fromRange: number;
        toRange: number;
      };

      return (
        <TooltipWrapper desc={desc}>
          <Progress
            aria-label={outputDef.key_name}
            size="md"
            value={value as number}
            minValue={extendedMetadata.fromRange}
            maxValue={extendedMetadata.toRange}
            color={
              (value as number) / extendedMetadata.toRange > 0.65
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
          <SmallBool text={value.toString()} isGreen={value as boolean} />
        </TooltipWrapper>
      );

    case ValueTypesOutput.Int:
      return (
        <TooltipWrapper desc={desc}>
          <div className="text-xs">{formatter.format(value as number)}</div>
        </TooltipWrapper>
      );

    default:
      return "N/A";
  }
};

const renderCell = (
  item: ReportTeamResponse[],
  columnKey: string,
  flatMappedOutputs: FlatMappedOutputs[],
) => {
  const [name, id] = columnKey.split("-");
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
    ? render(value.value, outputDef, value.desc)
    : render(value, outputDef);
};

export { renderCell };
