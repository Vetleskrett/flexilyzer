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
  /** Hasscript */
  hasScript?: boolean | null;
  /** Inputs */
  inputs: AnalyzerInputCreate[];
  /** Outputs */
  outputs: AnalyzerOutputCreate[];
}

/** AnalyzerInputCreate */
export interface AnalyzerInputCreate {
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
}

/** AnalyzerInputResponse */
export interface AnalyzerInputResponse {
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
  /** Id */
  id: number;
}

/** AnalyzerOutputCreate */
export interface AnalyzerOutputCreate {
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
  /** Display Name */
  display_name?: string | null;
  /** Extended Metadata */
  extended_metadata?: string | null;
}

/** AnalyzerOutputResponse */
export interface AnalyzerOutputResponse {
  /** Key Name */
  key_name: string;
  /** Value Type */
  value_type: string;
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
  /** Hasscript */
  hasScript?: boolean | null;
  /** Id */
  id: number;
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
  /** Hasscript */
  hasScript?: boolean | null;
  /** Id */
  id: number;
}

/** AssignmentCreate */
export interface AssignmentCreate {
  /** Name */
  name: string;
  /** Due Date */
  due_date?: string | null;
  /** Course Id */
  course_id: number;
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

/** Body_upload-analyzer-requirements */
export interface BodyUploadAnalyzerRequirements {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_upload-analyzer-script */
export interface BodyUploadAnalyzerScript {
  /**
   * File
   * @format binary
   */
  file: File;
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

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** Item */
export interface Item {
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  /** Price */
  price: number;
  /** Tax */
  tax?: number | null;
  /**
   * Tags
   * @default []
   */
  tags?: string[];
}

/** JobCreate */
export interface JobCreate {
  /** Assignment Id */
  assignment_id: number;
  /** Project Ids */
  project_ids?: number[] | null;
}

/** ProjectResponse */
export interface ProjectResponse {
  /** Github Link */
  github_link?: string | null;
  /** Team Id */
  team_id: number;
  /** Assignment Id */
  assignment_id: number;
  /** Id */
  id: number;
}

/** ReportResponse */
export interface ReportResponse {
  /**
   * Timestamp
   * @format date-time
   */
  timestamp: string;
  /** Report */
  report?: null;
  /** Analyzer Id */
  analyzer_id: number;
  /** Project Id */
  project_id: number;
  /** Id */
  id: number;
}

/** TeamResponse */
export interface TeamResponse {
  /** Github Team Link */
  github_team_link?: string | null;
  /** Blackboard Link */
  blackboard_link?: string | null;
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

/** testE */
export enum TestE {
  Value1 = 1,
  Value2 = 2,
}
