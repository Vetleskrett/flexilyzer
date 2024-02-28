export type RangeComponentT = {
  keyName: string;
  value: number;
  fromValue: number;
  toValue: number;
  avg: AvgMetric | undefined;
};

export type BoolComponentT = {
  keyName: string;
  value: boolean;
  distribution: TrueFalseDistribution | undefined;
};

export type TextComponentT = {
  keyName: string;
  value: string;
};

export type IntComponentT = {
  keyName: string;
  value: number;
  avg: AvgMetric | undefined;
};

export type DateComponentT = {
  keyName: string;
  value: string;
};

export type AvgMetric = {
  avg?: number;
};

export type DistributionMetric = {
  distribution: TrueFalseDistribution;
};

export type TrueFalseDistribution = {
  true: number;
  false: number;
};
