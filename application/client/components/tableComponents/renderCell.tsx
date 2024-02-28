import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { FlatMappedOutputs } from "@/types/tableDefinitions";
import { formatter } from "@/utils/formatUtils";
import { standardTimeFormatter } from "@/utils/timeUtils";
import { Tooltip, Progress, Chip } from "@nextui-org/react";
import { SmallBool } from "@/components/tableComponents/SmallBoolChip";

const renderCell = (
  item: ReportTeamResponse[],
  columnKey: string,
  flatMappedOutputs: FlatMappedOutputs[]
) => {
  const [name, id] = columnKey.split("-");

  if (name === "Team") return item[0].team_id;
  const report = item.find(
    (r: ReportTeamResponse) => r.analyzer_id === Number(id)
  );
  const value = report ? report.report[name] : undefined;

  const output = flatMappedOutputs.find(
    (output) => output.analyzerId === Number(id) && output.key_name === name
  );
  if (!output) return value;

  if (value === undefined) {
    return <p className="font-light">-</p>;
  }
  switch (output.value_type) {
    case ValueTypesOutput.Range:
      interface RangeMetadata {
        fromRange: number;
        toRange: number;
      }

      const extendedMetadata =
        output.extended_metadata as unknown as RangeMetadata;

      return (
        value && (
          <Tooltip
            delay={0}
            closeDelay={0}
            content={
              <>
                {value} / {extendedMetadata.toRange}
              </>
            }
          >
            <Progress
              aria-label={output.key_name}
              size="md"
              value={value}
              minValue={extendedMetadata.fromRange}
              maxValue={extendedMetadata.toRange}
              color={
                value / extendedMetadata.toRange > 0.65 ? "success" : "warning"
              }
              className="max-w-md"
            />
          </Tooltip>
        )
      );
    case ValueTypesOutput.Str:
      return <div className='text-xs'>{value}</div>;
    case ValueTypesOutput.Date:
      return (
        value && <div className='text-xs'>{standardTimeFormatter(value)}</div>
      );
    case ValueTypesOutput.Bool:
      return (
        value !== undefined && (
          <SmallBool text={value.toString()} isGreen={value} />
        )
      );
    case ValueTypesOutput.Int:
      return <div className='text-xs'>{formatter.format(value)}</div>;
    default:
      return "N/A";
  }
};

export { renderCell };
