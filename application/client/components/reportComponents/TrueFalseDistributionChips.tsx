"use client";

import { Chip } from "@nextui-org/react";

type TrueFalseProps = {
  truePercent: string;
  falsePercent: string;
};

export const TrueFalseDistributionChips = ({
  truePercent,
  falsePercent,
}: TrueFalseProps) => {
  return (
    <div className="mt-2 flex flex-row gap-2">
      <Chip
        size="sm"
        variant="bordered"
        className="border-green-600 text-xs text-gray-700"
      >
        {truePercent} %
      </Chip>
      <Chip
        size="sm"
        variant="bordered"
        className="border-red-600 text-xs text-gray-700"
      >
        {falsePercent} %
      </Chip>
    </div>
  );
};
