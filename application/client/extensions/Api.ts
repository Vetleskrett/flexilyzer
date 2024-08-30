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
    AnalyzerCreate,
    AnalyzerInputResponse,
    AnalyzerOutputResponse,
    AnalyzerResponse,
    AnalyzerSimplifiedResponse,
    AssignmentCreate,
    AssignmentMetadataResponse,
    AssignmentResponse,
    BatchResponse,
    BatchStatsResponse,
    BodyUploadAnalyzerRequirements,
    BodyUploadAnalyzerScript,
    CourseCreate,
    CourseResponse,
    HTTPValidationError,
    Item,
    JobCreate,
    ProjectResponse,
    ReportResponse,
    ReportTeamResponse,
    TeamResponse,
    TestE,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags tests
     * @name GetHelloTest
     * @summary Get Tasks
     * @request GET:${url}/test/hello-task
     */
    getHelloTest = (params: RequestParams = {}) =>
        this.request<TestE, any>({
            path: `/test/hello-task`,
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
     * @request POST:${url}/test/run_task/
     */
    postRunTest = (
        query: {
            /** Param */
            param: number;
        },
        params: RequestParams = {}
    ) =>
        this.request<Item[], HTTPValidationError>({
            path: `/test/run_task/`,
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
     * @request GET:${url}/courses/
     */
    getAllCourses = (params: RequestParams = {}) =>
        this.request<CourseResponse[], any>({
            path: `/courses/`,
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
     * @request POST:${url}/courses/
     */
    postCourse = (data: CourseCreate, params: RequestParams = {}) =>
        this.request<any, HTTPValidationError>({
            path: `/courses/`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags courses
     * @name PutCourse
     * @summary Put Course
     * @request PUT:${url}/courses/{course_id}
     */
    putCourse = (courseId: number, data: CourseCreate, params: RequestParams = {}) =>
        this.request<CourseResponse, HTTPValidationError>({
            path: `/courses/${courseId}`,
            method: "PUT",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags courses
     * @name GetCourse
     * @summary Get Course
     * @request GET:${url}/courses/{course_id}
     */
    getCourse = (courseId: number, params: RequestParams = {}) =>
        this.request<CourseResponse, HTTPValidationError>({
            path: `/courses/${courseId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags courses
     * @name DeleteCourse
     * @summary Delete Course
     * @request DELETE:${url}/courses/{course_id}
     */
    deleteCourse = (courseId: number, params: RequestParams = {}) =>
        this.request<CourseResponse, HTTPValidationError>({
            path: `/courses/${courseId}`,
            method: "DELETE",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags courses
     * @name GetCourseAssignments
     * @summary Get Course Assignments
     * @request GET:${url}/courses/{course_id}/assignments/
     */
    getCourseAssignments = (courseId: number, params: RequestParams = {}) =>
        this.request<AssignmentResponse[], HTTPValidationError>({
            path: `/courses/${courseId}/assignments/`,
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
     * @request GET:${url}/courses/{course_id}/teams/
     */
    getCourseTeams = (courseId: number, params: RequestParams = {}) =>
        this.request<TeamResponse[], HTTPValidationError>({
            path: `/courses/${courseId}/teams/`,
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
     * @request GET:${url}/assignments/
     */
    getAllAssignments = (params: RequestParams = {}) =>
        this.request<AssignmentResponse[], any>({
            path: `/assignments/`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name CreateAssignmentApiV1AssignmentsPost
     * @summary Create Assignment
     * @request POST:${url}/assignments/
     */
    createAssignmentApiV1AssignmentsPost = (data: AssignmentCreate, params: RequestParams = {}) =>
        this.request<any, HTTPValidationError>({
            path: `/assignments/`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignment
     * @summary Get Assignment
     * @request GET:${url}/assignments/{assignment_id}
     */
    getAssignment = (assignmentId: number, params: RequestParams = {}) =>
        this.request<AssignmentResponse, HTTPValidationError>({
            path: `/assignments/${assignmentId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentProjects
     * @summary Get Assignment Projects
     * @request GET:${url}/assignments/{assignment_id}/projects
     */
    getAssignmentProjects = (assignmentId: number, params: RequestParams = {}) =>
        this.request<ProjectResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/projects`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentMetadata
     * @summary Get Assignment Metadata
     * @request GET:${url}/assignments/{assignment_id}/metadata
     */
    getAssignmentMetadata = (assignmentId: number, params: RequestParams = {}) =>
        this.request<AssignmentMetadataResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/metadata`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentProjectsReports
     * @summary Get Assignment Team Projects Reports
     * @request GET:${url}/assignments/{assignment_id}/teams/{team_id}/projects/reports
     */
    getAssignmentProjectsReports = (assignmentId: number, teamId: number, params: RequestParams = {}) =>
        this.request<ReportResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/teams/${teamId}/projects/reports`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentProjectsReportsBatch
     * @summary Get Assignment Team Projects Report Batch
     * @request GET:${url}/assignments/{assignment_id}/teams/{team_id}/projects/reports/batch/{batch_id}
     */
    getAssignmentProjectsReportsBatch = (
        assignmentId: number,
        teamId: number,
        batchId: number,
        params: RequestParams = {}
    ) =>
        this.request<ReportResponse, HTTPValidationError>({
            path: `/assignments/${assignmentId}/teams/${teamId}/projects/reports/batch/${batchId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentAnalyzers
     * @summary Get Assignment Analyzers
     * @request GET:${url}/assignments/{assignment_id}/analyzers
     */
    getAssignmentAnalyzers = (assignmentId: number, params: RequestParams = {}) =>
        this.request<AnalyzerSimplifiedResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/analyzers`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentAnalyzersBatches
     * @summary Get Assignment Analyzer Batches
     * @request GET:${url}/assignments/{assignment_id}/analyzers/{analyzer_id}/batches
     */
    getAssignmentAnalyzersBatches = (assignmentId: number, analyzerId: number, params: RequestParams = {}) =>
        this.request<BatchResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/analyzers/${analyzerId}/batches`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name GetAssignmentAnalyzersBatchesLatestReports
     * @summary Get Assignment Analyzer Batches Latest Reports
     * @request GET:${url}/assignments/{assignment_id}/analyzers/{analyzer_id}/batches/latest/reports
     */
    getAssignmentAnalyzersBatchesLatestReports = (
        assignmentId: number,
        analyzerId: number,
        params: RequestParams = {}
    ) =>
        this.request<ReportTeamResponse[], HTTPValidationError>({
            path: `/assignments/${assignmentId}/analyzers/${analyzerId}/batches/latest/reports`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags assignments
     * @name ConnectAssignmentAnalyzers
     * @summary Connect Assignmnet Analyzer
     * @request POST:${url}/assignments/{assignment_id}/analyzers/{analyzer_id}/connect
     */
    connectAssignmentAnalyzers = (assignmentId: number, analyzerId: number, params: RequestParams = {}) =>
        this.request<any, HTTPValidationError>({
            path: `/assignments/${assignmentId}/analyzers/${analyzerId}/connect`,
            method: "POST",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags teams
     * @name GetAllTeams
     * @summary Get All Teams
     * @request GET:${url}/teams/
     */
    getAllTeams = (params: RequestParams = {}) =>
        this.request<TeamResponse[], any>({
            path: `/teams/`,
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
     * @request GET:${url}/teams/{team_id}
     */
    getTeam = (teamId: number, params: RequestParams = {}) =>
        this.request<TeamResponse[], HTTPValidationError>({
            path: `/teams/${teamId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags teams
     * @name GetTeamProjects
     * @summary Get All Teams
     * @request GET:${url}/teams/{team_id}/projects
     */
    getTeamProjects = (teamId: number, params: RequestParams = {}) =>
        this.request<TeamResponse[], HTTPValidationError>({
            path: `/teams/${teamId}/projects`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags projects
     * @name GetAllProjects
     * @summary Get All Teams
     * @request GET:${url}/projects/
     */
    getAllProjects = (params: RequestParams = {}) =>
        this.request<ProjectResponse[], any>({
            path: `/projects/`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags projects
     * @name GetProject
     * @summary Get All Teams
     * @request GET:${url}/projects/{project_id}
     */
    getProject = (projectId: number, params: RequestParams = {}) =>
        this.request<ProjectResponse, HTTPValidationError>({
            path: `/projects/${projectId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags projects
     * @name GetProjectReports
     * @summary Get All Teams
     * @request GET:${url}/projects/{project_id}/reports
     */
    getProjectReports = (projectId: number, params: RequestParams = {}) =>
        this.request<ReportResponse[], HTTPValidationError>({
            path: `/projects/${projectId}/reports`,
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
     * @request GET:${url}/reports/
     */
    getAllReports = (params: RequestParams = {}) =>
        this.request<ReportResponse[], any>({
            path: `/reports/`,
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
     * @request GET:${url}/reports/{report_id}
     */
    getReport = (reportId: number, params: RequestParams = {}) =>
        this.request<ReportResponse, HTTPValidationError>({
            path: `/reports/${reportId}`,
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
     * @request GET:${url}/analyzers/
     */
    getAllAnalyzers = (params: RequestParams = {}) =>
        this.request<AnalyzerSimplifiedResponse[], any>({
            path: `/analyzers/`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name PostAnalyzer
     * @summary Post Analyzer
     * @request POST:${url}/analyzers/
     */
    postAnalyzer = (data: AnalyzerCreate, params: RequestParams = {}) =>
        this.request<AnalyzerResponse, HTTPValidationError>({
            path: `/analyzers/`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzer
     * @summary Get Analyzer
     * @request GET:${url}/analyzers/{analyzer_id}
     */
    getAnalyzer = (analyzerId: number, params: RequestParams = {}) =>
        this.request<AnalyzerSimplifiedResponse, HTTPValidationError>({
            path: `/analyzers/${analyzerId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzerInputs
     * @summary Get Analyzer Inputs
     * @request GET:${url}/analyzers/{analyzer_id}/inputs
     */
    getAnalyzerInputs = (analyzerId: number, params: RequestParams = {}) =>
        this.request<AnalyzerInputResponse[], HTTPValidationError>({
            path: `/analyzers/${analyzerId}/inputs`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzerOutputs
     * @summary Get Analyzer Outputs
     * @request GET:${url}/analyzers/{analyzer_id}/outputs
     */
    getAnalyzerOutputs = (analyzerId: number, params: RequestParams = {}) =>
        this.request<AnalyzerOutputResponse[], HTTPValidationError>({
            path: `/analyzers/${analyzerId}/outputs`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzerTemplate
     * @summary Get Analyzer Template
     * @request POST:${url}/analyzers/template
     */
    getAnalyzerTemplate = (data: AnalyzerCreate, params: RequestParams = {}) =>
        this.request<string, HTTPValidationError>({
            path: `/analyzers/template`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name UploadAnalyzerScript
     * @summary Upload Analyzer Script
     * @request POST:${url}/analyzers/{analyzer_id}/upload/script
     */
    uploadAnalyzerScript = (analyzerId: number, data: BodyUploadAnalyzerScript, params: RequestParams = {}) =>
        this.request<string, HTTPValidationError>({
            path: `/analyzers/${analyzerId}/upload/script`,
            method: "POST",
            body: data,
            type: ContentType.FormData,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name DeleteAnalyzerScript
     * @summary Delete Analyzer Script
     * @request DELETE:${url}/analyzers/{analyzer_id}/script
     */
    deleteAnalyzerScript = (analyzerId: number, params: RequestParams = {}) =>
        this.request<void, HTTPValidationError>({
            path: `/analyzers/${analyzerId}/script`,
            method: "DELETE",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzerScript
     * @summary Get Analyzer Script
     * @request GET:${url}/analyzers/{analyzer_id}/script
     */
    getAnalyzerScript = (analyzerId: number, params: RequestParams = {}) =>
        this.request<string, HTTPValidationError>({
            path: `/analyzers/${analyzerId}/script`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name GetAnalyzerRequirements
     * @summary Get Analyzer Requirements
     * @request GET:${url}/analyzers/{analyzer_id}/requirements
     */
    getAnalyzerRequirements = (analyzerId: number, params: RequestParams = {}) =>
        this.request<string, HTTPValidationError>({
            path: `/analyzers/${analyzerId}/requirements`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags analyzers
     * @name UploadAnalyzerRequirements
     * @summary Upload Analyzer Requirements
     * @request POST:${url}/analyzers/{analyzer_id}/upload/requirements
     */
    uploadAnalyzerRequirements = (
        analyzerId: number,
        data: BodyUploadAnalyzerRequirements,
        params: RequestParams = {}
    ) =>
        this.request<string, HTTPValidationError>({
            path: `/analyzers/${analyzerId}/upload/requirements`,
            method: "POST",
            body: data,
            type: ContentType.FormData,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags jobs
     * @name RunJob
     * @summary Run Job
     * @request POST:${url}/jobs/{analyzer}
     */
    runJob = (analyzer: number, data: JobCreate, params: RequestParams = {}) =>
        this.request<BatchResponse, HTTPValidationError>({
            path: `/jobs/${analyzer}`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags batches
     * @name GetAllBatches
     * @summary Get Batches
     * @request GET:${url}/batches/
     */
    getAllBatches = (params: RequestParams = {}) =>
        this.request<BatchResponse[], any>({
            path: `/batches/`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags batches
     * @name GetBatch
     * @summary Get Batch
     * @request GET:${url}/batches/{batch_id}
     */
    getBatch = (batchId: number, params: RequestParams = {}) =>
        this.request<BatchResponse, HTTPValidationError>({
            path: `/batches/${batchId}`,
            method: "GET",
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags batches
     * @name GetBatchStats
     * @summary Get Batch Stats
     * @request GET:${url}/batches/{batch_id}/stats
     */
    getBatchStats = (batchId: number, params: RequestParams = {}) =>
        this.request<BatchStatsResponse, HTTPValidationError>({
            path: `/batches/${batchId}/stats`,
            method: "GET",
            format: "json",
            ...params,
        });
}
