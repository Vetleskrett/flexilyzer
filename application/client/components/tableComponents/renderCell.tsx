import {
  ReportTeamResponse,
  ValueTypesOutput,
} from "@/extensions/data-contracts";
import { FlatMappedOutputs } from "@/types/tableDefinitions";
import { Tooltip, Progress, Chip } from "@nextui-org/react";

const renderCell = (
  item: ReportTeamResponse[],
  columnKey: string,
  flatMappedOutputs: FlatMappedOutputs[]
) => {
  console.log("renderCell run");
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
      return value;
    case ValueTypesOutput.Bool:
      return (
        value !== undefined && (
          <Chip
            size="sm"
            variant="solid"
            color={(value as boolean) ? "success" : "danger"}
            className="text-white"
          >
            {value ? "True" : "False"}
          </Chip>
        )
      );
    case ValueTypesOutput.Int:
      return value;
    default:
      return "N/A";
  }
};

export { renderCell };
