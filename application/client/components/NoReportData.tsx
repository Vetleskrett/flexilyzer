"use client";
import { Card } from "@nextui-org/react";

export const NoReportData = () => {
  return (
    // <div className="mt-16 text-center">No reports to display</div>;
    <div className="mt-16 flex items-center justify-center">
      <Card className="flex flex-col items-center justify-center bg-red-50 p-10 shadow-xl">
        <h3 className="h3 mb-4">No Reports to Display</h3>
        <p className="mb-6 text-center text-gray-500">
          It looks like there are no reports available for this analyzer.
        </p>
        <p className="text-gray-500">
          Try running an analyzer under the Details section
        </p>
      </Card>
    </div>
  );
};
