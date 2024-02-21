import { Selection } from "@nextui-org/react";

interface BottomContentProps {
  tableLength: number;
  selectedKeys: Selection;
}
const BottomContent = ({ tableLength, selectedKeys }: BottomContentProps) => {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${tableLength} selected`}
      </span>
    </div>
  );
};

export { BottomContent };
