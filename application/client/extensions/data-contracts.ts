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

/** AnalyzerResponse */
export interface AnalyzerResponse {
  /** Name */
  name: string;
  /** Creator */
  creator?: string | null;
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

/** MetricDefinitionResponse */
export interface MetricDefinitionResponse {
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
  /** Analyzer Id */
  analyzer_id: number;
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
  /** Repository Id */
  repository_id: number;
  /** Id */
  id: number;
}

/** RepositoryResponse */
export interface RepositoryResponse {
  /** Github Link */
  github_link?: string | null;
  /** Team Id */
  team_id: number;
  /** Assignment Id */
  assignment_id: number;
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
