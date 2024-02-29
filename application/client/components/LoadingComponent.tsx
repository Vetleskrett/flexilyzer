"use client";

import { Spinner } from "@nextui-org/react";

export const LoadingComponent = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col mt-16 justify-center items-center">
      <Spinner />
      {text && <div>{text}</div>}
    </div>
  );
};
