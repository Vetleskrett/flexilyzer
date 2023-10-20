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

import { AssignmentResponse, HTTPValidationError, Item, TestE } from "./data-contracts";
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
   * @tags assignments
   * @name GetAllAssignments
   * @summary Get All Assignments
   * @request GET:/api/v1/assignments/
   */
  getAllAssignments = (params: RequestParams = {}) =>
    this.request<AssignmentResponse[], any>({
      path: `/api/v1/assignments/`,
      method: "GET",
      format: "json",
      ...params,
    });
}
