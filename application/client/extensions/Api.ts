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

import {
  AnalyzerResponse,
  AssignmentResponse,
  CourseResponse,
  HTTPValidationError,
  Item,
  MetricDefinitionResponse,
  ReportResponse,
  RepositoryResponse,
  TeamResponse,
  TestE,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tests
   * @name GetHelloTest
   * @summary Get Tasks
   * @request GET:/api/v1/test/hello-task
   */
  getHelloTest = (params: RequestParams = {}) =>
    this.request<TestE, any>({
      path: `/api/v1/test/hello-task`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tests
   * @name PostRunTest
   * @summary Run Task
   * @request POST:/api/v1/test/run_task/
   */
  postRunTest = (
    query: {
      /** Param */
      param: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<Item[], HTTPValidationError>({
      path: `/api/v1/test/run_task/`,
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
   * @summary Get Courses
   * @request GET:/api/v1/courses/
   */
  getAllCourses = (params: RequestParams = {}) =>
    this.request<CourseResponse[], any>({
      path: `/api/v1/courses/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name PostCourse
   * @summary Post Course
   * @request POST:/api/v1/courses/
   */
  postCourse = (params: RequestParams = {}) =>
    this.request<CourseResponse[], any>({
      path: `/api/v1/courses/`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name GetCourse
   * @summary Get Course
   * @request GET:/api/v1/courses/{id}
   */
  getCourse = (id: number, params: RequestParams = {}) =>
    this.request<CourseResponse, HTTPValidationError>({
      path: `/api/v1/courses/${id}`,
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
   * @request GET:/api/v1/courses/{id}/assignments/
   */
  getCourseAssignments = (id: number, params: RequestParams = {}) =>
    this.request<AssignmentResponse[], HTTPValidationError>({
      path: `/api/v1/courses/${id}/assignments/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags courses
   * @name GetCourseTeams
   * @summary Get Courses Teams
   * @request GET:/api/v1/courses/{id}/teams/
   */
  getCourseTeams = (id: number, params: RequestParams = {}) =>
    this.request<TeamResponse[], HTTPValidationError>({
      path: `/api/v1/courses/${id}/teams/`,
      method: "GET",
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
  /**
   * No description
   *
   * @tags assignments
   * @name GetAssignment
   * @summary Get Assignment
   * @request GET:/api/v1/assignments/{assignment_id}
   */
  getAssignment = (assignmentId: number, params: RequestParams = {}) =>
    this.request<AssignmentResponse, HTTPValidationError>({
      path: `/api/v1/assignments/${assignmentId}`,
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
    this.request<RepositoryResponse[], HTTPValidationError>({
      path: `/api/v1/assignments/${assignmentId}/repositories`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags teams
   * @name GetAllTeams
   * @summary Get All Teams
   * @request GET:/api/v1/teams/
   */
  getAllTeams = (params: RequestParams = {}) =>
    this.request<TeamResponse[], any>({
      path: `/api/v1/teams/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags teams
   * @name GetTeam
   * @summary Get All Teams
   * @request GET:/api/v1/teams/{team_id}
   */
  getTeam = (teamId: number, params: RequestParams = {}) =>
    this.request<TeamResponse[], HTTPValidationError>({
      path: `/api/v1/teams/${teamId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags teams
   * @name GetTeamRepositories
   * @summary Get All Teams
   * @request GET:/api/v1/teams/{team_id}/repositories
   */
  getTeamRepositories = (teamId: number, params: RequestParams = {}) =>
    this.request<TeamResponse[], HTTPValidationError>({
      path: `/api/v1/teams/${teamId}/repositories`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags repositories
   * @name GetAllRepositories
   * @summary Get All Teams
   * @request GET:/api/v1/repositories/
   */
  getAllRepositories = (params: RequestParams = {}) =>
    this.request<RepositoryResponse[], any>({
      path: `/api/v1/repositories/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags repositories
   * @name GetRepository
   * @summary Get All Teams
   * @request GET:/api/v1/repositories/{repository_id}
   */
  getRepository = (repositoryId: number, params: RequestParams = {}) =>
    this.request<RepositoryResponse, HTTPValidationError>({
      path: `/api/v1/repositories/${repositoryId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags repositories
   * @name GetRepositoryReports
   * @summary Get All Teams
   * @request GET:/api/v1/repositories/{repository_id}/reports
   */
  getRepositoryReports = (repositoryId: number, params: RequestParams = {}) =>
    this.request<ReportResponse[], HTTPValidationError>({
      path: `/api/v1/repositories/${repositoryId}/reports`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags reports
   * @name GetAllReports
   * @summary Get All Reports
   * @request GET:/api/v1/reports/
   */
  getAllReports = (params: RequestParams = {}) =>
    this.request<ReportResponse[], any>({
      path: `/api/v1/reports/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags reports
   * @name GetReport
   * @summary Get Report
   * @request GET:/api/v1/reports/{report_id}
   */
  getReport = (reportId: number, params: RequestParams = {}) =>
    this.request<ReportResponse, HTTPValidationError>({
      path: `/api/v1/reports/${reportId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags analyzers
   * @name GetAllAnalyzers
   * @summary Get All Analyzers
   * @request GET:/api/v1/analyzers/
   */
  getAllAnalyzers = (params: RequestParams = {}) =>
    this.request<AnalyzerResponse[], any>({
      path: `/api/v1/analyzers/`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags analyzers
   * @name GetAnalyzer
   * @summary Get Analyzer
   * @request GET:/api/v1/analyzers/{analyzer_id}
   */
  getAnalyzer = (analyzerId: number, params: RequestParams = {}) =>
    this.request<AnalyzerResponse, HTTPValidationError>({
      path: `/api/v1/analyzers/${analyzerId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags analyzers
   * @name GetAnalyzerMetricDefinitions
   * @summary Get Analyzer Metric Definition
   * @request GET:/api/v1/analyzers/{analyzer_id}/metric_definitions
   */
  getAnalyzerMetricDefinitions = (analyzerId: number, params: RequestParams = {}) =>
    this.request<MetricDefinitionResponse[], HTTPValidationError>({
      path: `/api/v1/analyzers/${analyzerId}/metric_definitions`,
      method: "GET",
      format: "json",
      ...params,
    });
}
