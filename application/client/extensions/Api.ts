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

import { HTTPValidationError, Item, TestE } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tasks
   * @name GetHelloTask
   * @summary Get Tasks
   * @request GET:/api/v1/tasks/hello-task
   */
  getHelloTask = (params: RequestParams = {}) =>
    this.request<TestE, any>({
      path: `/api/v1/tasks/hello-task`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tasks
   * @name PostRunTask
   * @summary Run Task
   * @request POST:/api/v1/tasks/run_task/
   */
  postRunTask = (
    query: {
      /** Param */
      param: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<Item[], HTTPValidationError>({
      path: `/api/v1/tasks/run_task/`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name GetAllCourses
   * @summary Get All Courses
   * @request GET:/api/v1/courses/
   */
  getAllCourses = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/v1/courses/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name GetCourseAssignments
   * @summary Get Course Assignments
   * @request GET:/api/v1/courses/{course_id}/assignments
   */
  getCourseAssignments = (courseId: number, params: RequestParams = {}) =>
    this.request<any, HTTPValidationError>({
      path: `/api/v1/courses/${courseId}/assignments`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name CreateCourse
   * @summary Create Course
   * @request POST:/api/v1/courses/create
   */
  createCourse = (
    query: {
      /** Param */
      param: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, HTTPValidationError>({
      path: `/api/v1/courses/create`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assignments
   * @name GetAllAssignments
   * @summary Get All Assignments
   * @request GET:/api/v1/assignments/
   */
  getAllAssignments = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/v1/assignments/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assignments
   * @name GetAssignmentRepositories
   * @summary Get Assignment Repositories
   * @request GET:/api/v1/assignments/{assignment_id}/repositories
   */
  getAssignmentRepositories = (assignmentId: number, params: RequestParams = {}) =>
    this.request<any, HTTPValidationError>({
      path: `/api/v1/assignments/${assignmentId}/repositories`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assignments
   * @name GetAssignmentRepositoriesReports
   * @summary Get Assignment Repositories Reports
   * @request GET:/api/v1/assignments/{assignment_id}/repositories_with_reports
   */
  getAssignmentRepositoriesReports = (assignmentId: number, params: RequestParams = {}) =>
    this.request<any, HTTPValidationError>({
      path: `/api/v1/assignments/${assignmentId}/repositories_with_reports`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assignments
   * @name CreateCourse2
   * @summary Create Course
   * @request POST:/api/v1/assignments/create
   * @originalName createCourse
   * @duplicate
   */
  createCourse2 = (
    query: {
      /** Param */
      param: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, HTTPValidationError>({
      path: `/api/v1/assignments/create`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
}
