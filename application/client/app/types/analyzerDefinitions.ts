export type Parameter = {
  keyName: string;
  valueType: string;
};

export type FormDataT = {
  name: string;
  description: string;
  parameters: Parameter[];
};
