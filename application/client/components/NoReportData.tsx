"use client";
import { Card, Button } from "@nextui-org/react";

export const NoReportData = () => {
  return (
    // <div className="mt-16 text-center">No reports to display</div>;
    <div className='flex justify-center items-center mt-16'>
      <Card className='flex flex-col items-center justify-center p-10 shadow-xl bg-red-50'>
        <h3 className='h3 mb-4'>No Reports to Display</h3>
        <p className='text-center text-gray-500 mb-6'>
          It looks like there are no reports available for this analyzer.
        </p>
        <p className='text-gray-500'>
          Try running an analyzer under the Details section
        </p>
      </Card>
    </div>
  );
};
