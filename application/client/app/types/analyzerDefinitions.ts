export type InputParameter = {
  id: string;
  key_name: string;
  value_type: string;
};

export type RangeMetadata = {
  from_value: number | undefined;
  to_value: number | undefined;
};

export type OutputParameter = {
  id: string;
  key_name: string;
  value_type: string;
  display_name: string;
  extended_metadata?: RangeMetadata;
};

export type FormDataT = {
  name: string;
  description: string;
  input_parameters: InputParameter[];
  output_parameters: OutputParameter[];
};
