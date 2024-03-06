import { TooltipWrapperProps } from "@/components/TooltipWrapper";

export type RangeComponentT = {
  keyName: string;
  value: number;
  fromValue: number;
  toValue: number;
  avg: AvgMetric | undefined;
  desc: TooltipWrapperProps["desc"];
};

export type BoolComponentT = {
  keyName: string;
  value: JSX.Element;
  distribution: TrueFalseDistribution | undefined;
};

export type TextComponentT = {
  keyName: string;
  value: JSX.Element;
};

export type IntComponentT = {
  keyName: string;
  value: JSX.Element;
  avg: AvgMetric | undefined;
};

export type ReportComponentT = {
  keyName: string;
  children: JSX.Element;
  avgValue?: JSX.Element | string;
};

export type DateComponentT = {
  keyName: string;
  value: JSX.Element;
  avg: DateAvgMetric | undefined;
};

export type AvgMetric = {
  avg?: number;
};

export type DateAvgMetric = {
  avg?: string;
};

export type DistributionMetric = {
  distribution: TrueFalseDistribution;
};

export type TrueFalseDistribution = {
  true: number;
  false: number;
};
