import { ValueTypesInput, ValueTypesOutput } from "@/extensions/data-contracts";

export const pythonTypesMap = {
  [ValueTypesInput.Bool]: { pythonType: "bool" },
  [ValueTypesInput.Str]: { pythonType: "str" },
  [ValueTypesInput.Int]: { pythonType: "int" },
  [ValueTypesInput.Zip]: { pythonType: "Path" },
  [ValueTypesOutput.Date]: { pythonType: "datetime" },
  [ValueTypesOutput.Range]: { pythonType: "int" },
} satisfies Record<ValueTypesInput | ValueTypesOutput, { pythonType: string }>;
