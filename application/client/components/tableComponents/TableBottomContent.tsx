import { Selection } from "@nextui-org/react";

interface BottomContentProps {
  tableLength: number;
  selectedKeys: Selection;
}
const BottomContent = ({ tableLength, selectedKeys }: BottomContentProps) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${tableLength} selected`}
      </span>
    </div>
  );
};

export { BottomContent };
