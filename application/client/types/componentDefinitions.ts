export type rangeComponent = {
  keyName: string;
  value: number;
  fromValue: number;
  toValue: number;
  avg: AvgMetric | undefined;
};

export type boolComponent = {
  keyName: string;
  value: boolean;
  distribution: TrueFalseDistribution | undefined;
};

export type textComponent = {
  keyName: string;
  value: string;
};

export type intComponent = {
  keyName: string;
  value: number;
  avg: AvgMetric | undefined;
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
