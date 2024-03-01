"use client";

import { Spinner } from "@nextui-org/react";

export const LoadingComponent = ({ text }: { text?: string }) => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <Spinner />
      {text && <div>{text}</div>}
    </div>
  );
};
