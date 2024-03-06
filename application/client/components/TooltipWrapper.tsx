"use client";

import { Tooltip } from "@nextui-org/react";

export type TooltipWrapperProps = {
  desc: JSX.Element | string | undefined;
  children: JSX.Element;
};

export const TooltipWrapper = ({ desc, children }: TooltipWrapperProps) => {
  return desc ? (
    <Tooltip delay={0} closeDelay={0} content={desc} placement="left">
      {children}
    </Tooltip>
  ) : (
    children
  );
};
