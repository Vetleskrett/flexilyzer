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

/** AssignmentResponse */
export interface AssignmentResponse {
  /** Name */
  name: string;
  /** Due Date */
  due_date?: string | null;
  course: CourseResponse;
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
