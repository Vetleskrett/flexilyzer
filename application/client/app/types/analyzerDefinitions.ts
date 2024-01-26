export type InputParameter = {
  keyName: string;
  valueType: string;
};

export type OutputParameter = {
  keyName: string;
  valueType: string;
  displayName: string;
};

export type FormDataT = {
  name: string;
  description: string;
  inputParameters: InputParameter[];
  outputParameters: OutputParameter[];
};
