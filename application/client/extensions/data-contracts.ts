/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AnalyzerCreate */
export interface AnalyzerCreate {
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Creator */
  creator?: string | null;
  /** Inputs */
  inputs: AnalyzerInputCreate[];
  /** Outputs */
  outputs: AnalyzerOutputCreate[];
}

/** AnalyzerInputCreate */
export interface AnalyzerInputCreate {
  /** Key Name */
  key_name: string;
  value_type: ValueTypesInput;
}

/** AnalyzerInputResponse */
export interface AnalyzerInputResponse {
  /** Key Name */
  key_name: string;
  value_type: ValueTypesInput;
  /** Id */
  id: number;
}

/** AnalyzerOutputCreate */
export interface AnalyzerOutputCreate {
  /** Key Name */
  key_name: string;
  value_type: ValueTypesOutput;
  /** Display Name */
  display_name?: string | null;
  /** Extended Metadata */
  extended_metadata?: string | null;
}

/** AnalyzerOutputResponse */
export interface AnalyzerOutputResponse {
  /** Key Name */
  key_name: string;
  value_type: ValueTypesOutput;
  /** Display Name */
  display_name?: string | null;
  /** Extended Metadata */
  extended_metadata?: null;
  /** Id */
  id: number;
}

/** AnalyzerResponse */
export interface AnalyzerResponse {
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Creator */
  creator?: string | null;
  /** Id */
  id: number;
  /** Has Script */
  has_script?: boolean | null;
  /** Has Venv */
  has_venv?: boolean | null;
  /** Inputs */
  inputs: AnalyzerInputResponse[];
  /** Outputs */
  outputs: AnalyzerOutputResponse[];
}

/** AnalyzerSimplifiedResponse */
export interface AnalyzerSimplifiedResponse {
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Creator */
  creator?: string | null;
  /** Id */
  id: number;
  /** Has Script */
  has_script?: boolean | null;
  /** Has Requirements */
  has_requirements?: boolean | null;
}

/** AssignmentCreate */
export interface AssignmentCreate {
  /** Name */
  name: string;
  /** Due Date */
  due_date?: string | null;
  /** Course Id */
  course_id: number;
  /** Metadata */
  metadata: AssignmentMetadataCreate[];
}

/** AssignmentMetadataCreate */
export interface AssignmentMetadataCreate {
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
}

/** AssignmentMetadataResponse */
export interface AssignmentMetadataResponse {
  /** Assignment Id */
  assignment_id: number;
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
  /** Id */
  id: number;
}

/** AssignmentResponse */
export interface AssignmentResponse {
  /** Name */
  name: string;
  /** Due Date */
  due_date?: string | null;
  /** Course Id */
  course_id: number;
  /** Id */
  id: number;
}

/** BatchEnum */
export enum BatchEnum {
  STARTED = "STARTED",
  RUNNING = "RUNNING",
  FAILED = "FAILED",
  FINISHED = "FINISHED",
}

/** BatchResponse */
export interface BatchResponse {
  /** Assignment Id */
  assignment_id: number;
  /** Analyzer Id */
  analyzer_id: number;
  /** Id */
  id: number;
  status: BatchEnum;
  /**
   * Timestamp
   * @format date-time
   */
  timestamp: string;
}

/** BatchStatsResponse */
export interface BatchStatsResponse {
  /** Id */
  id: number;
  /** Stats */
  stats: Record<string, object>;
}

/** CourseCreate */
export interface CourseCreate {
  /** Tag */
  tag: string;
  /** Name */
  name?: string | null;
}

/** CourseResponse */
export interface CourseResponse {
  /** Tag */
  tag: string;
  /** Name */
  name?: string | null;
  /** Id */
  id: number;
}

/** FileUpload */
export interface FileUpload {
  /** Text */
  text: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** JobCreate */
export interface JobCreate {
  /** Assignment Id */
  assignment_id: number;
  /** Project Ids */
  project_ids?: number[] | null;
  /** Run Input */
  run_input?: object | null;
}

/** ProjectCreate */
export interface ProjectCreate {
  /** Team Id */
  team_id: number;
  /** Assignment Id */
  assignment_id: number;
  /** Project Metadata */
  project_metadata: ProjectMetadataCreate[];
}

/** ProjectMetadataCreate */
export interface ProjectMetadataCreate {
  /** Value */
  value: string;
  /** Assignment Metadata Id */
  assignment_metadata_id: number;
}

/** ProjectMetadataResponse */
export interface ProjectMetadataResponse {
  /** Value */
  value: string;
  /** Project Id */
  project_id: number;
  /** Assignment Metadata Id */
  assignment_metadata_id: number;
  /** Id */
  id: number;
}

/** ProjectResponse */
export interface ProjectResponse {
  /** Team Id */
  team_id: number;
  /** Assignment Id */
  assignment_id: number;
  /** Id */
  id: number;
  /** Project Metadata */
  project_metadata: ProjectMetadataResponse[];
}

/** ReportResponse */
export interface ReportResponse {
  /** Report */
  report: any;
  /** Project Id */
  project_id: number;
  /** Batch Id */
  batch_id: number;
  /** Id */
  id: number;
}

/** ReportTeamResponse */
export interface ReportTeamResponse {
  /** Report */
  report: any;
  /** Project Id */
  project_id: number;
  /** Batch Id */
  batch_id: number;
  /** Id */
  id: number;
  /** Team Id */
  team_id: number;
  /** Analyzer Id */
  analyzer_id: number;
}

/** TeamCreate */
export interface TeamCreate {
  /** Course Id */
  course_id: number;
}

/** TeamResponse */
export interface TeamResponse {
  /** Course Id */
  course_id: number;
  /** Id */
  id: number;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** ValueTypesInput */
export enum ValueTypesInput {
  Str = "str",
  Int = "int",
  Bool = "bool",
  Zip = "zip",
}

/** ValueTypesOutput */
export enum ValueTypesOutput {
  Str = "str",
  Int = "int",
  Bool = "bool",
  Range = "range",
  Date = "date",
  File = "file",
}
