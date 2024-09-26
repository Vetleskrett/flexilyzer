"use server";

import { Api } from "@/extensions/Api";
import { AnalyzerCreate, AssignmentCreate, FileUpload, CourseCreate, JobCreate, ProjectCreate, TeamCreate } from "@/extensions/data-contracts";
import { HttpResponse } from "@/extensions/http-client";

const api = new Api({ baseUrl: process.env.internalApiUrl });


async function serverApiCall<T>(apiCall: () => Promise<HttpResponse<T, any>>) {
    const response = await apiCall();
    if (response.ok) {
        return response.data;
    } else {
        throw new Error(response.error);
    }
}

export const getAllCourses = async () => serverApiCall(() => api.getAllCourses({ cache: "no-cache" }));
export const postCourse = async (data: CourseCreate) => serverApiCall(() => api.postCourse(data, { cache: "no-cache" }));
export const putCourse = async (courseId: number, data: CourseCreate) => serverApiCall(() => api.putCourse(courseId, data, { cache: "no-cache" }));
export const getCourse = async (courseId: number) => serverApiCall(() => api.getCourse(courseId, { cache: "no-cache" }));
export const deleteCourse = async (courseId: number) => serverApiCall(() => api.deleteCourse(courseId, { cache: "no-cache" }));
export const getCourseAssignments = async (courseId: number) => serverApiCall(() => api.getCourseAssignments(courseId, { cache: "no-cache" }));
export const getCourseTeams = async (courseId: number) => serverApiCall(() => api.getCourseTeams(courseId, { cache: "no-cache" }));
export const getAllAssignments = async () => serverApiCall(() => api.getAllAssignments({ cache: "no-cache" }));
export const createAssignment = async (data: AssignmentCreate) => serverApiCall(() => api.createAssignment(data, { cache: "no-cache" }));
export const getAssignment = async (assignmentId: number) => serverApiCall(() => api.getAssignment(assignmentId, { cache: "no-cache" }));
export const getAssignmentProjects = async (assignmentId: number) => serverApiCall(() => api.getAssignmentProjects(assignmentId, { cache: "no-cache" }));
export const getAssignmentMetadata = async (assignmentId: number) => serverApiCall(() => api.getAssignmentMetadata(assignmentId, { cache: "no-cache" }));
export const getAssignmentProject = async (assignmentId: number, teamId: number) => serverApiCall(() => api.getAssignmentProject(assignmentId, teamId, { cache: "no-cache" }));
export const getAssignmentProjectsReports = async (assignmentId: number, teamId: number) => serverApiCall(() => api.getAssignmentProjectsReports(assignmentId, teamId, { cache: "no-cache" }));
export const getAssignmentProjectsReportsBatch = async (assignmentId: number, teamId: number, batchId: number) => serverApiCall(() => api.getAssignmentProjectsReportsBatch(assignmentId, teamId, batchId, { cache: "no-cache" }));
export const getAssignmentAnalyzers = async (assignmentId: number) => serverApiCall(() => api.getAssignmentAnalyzers(assignmentId, { cache: "no-cache" }));
export const getAssignmentAnalyzersBatches = async (assignmentId: number, analyzerId: number) => serverApiCall(() => api.getAssignmentAnalyzersBatches(assignmentId, analyzerId, { cache: "no-cache" }));
export const getAssignmentAnalyzersBatchesLatestReports = async (assignmentId: number, analyzerId: number) => serverApiCall(() => api.getAssignmentAnalyzersBatchesLatestReports(assignmentId, analyzerId, { cache: "no-cache" }));
export const connectAssignmentAnalyzers = async (assignmentId: number, analyzerId: number) => serverApiCall(() => api.connectAssignmentAnalyzers(assignmentId, analyzerId, { cache: "no-cache" }));
export const getAllTeams = async () => serverApiCall(() => api.getAllTeams({ cache: "no-cache" }));
export const postTeam = async (data: TeamCreate) => serverApiCall(() => api.postTeam(data, { cache: "no-cache" }));
export const getTeam = async (teamId: number) => serverApiCall(() => api.getTeam(teamId, { cache: "no-cache" }));
export const getTeamProjects = async (teamId: number) => serverApiCall(() => api.getTeamProjects(teamId, { cache: "no-cache" }));
export const postTeams = async (courseId: number, numberOfTeams: number) => serverApiCall(() => api.postTeams(courseId, numberOfTeams, { cache: "no-cache" }));
export const getAllProjects = async () => serverApiCall(() => api.getAllProjects({ cache: "no-cache" }));
export const createProject = async (data: ProjectCreate) => serverApiCall(() => api.createProject(data, { cache: "no-cache" }));
export const getProject = async (projectId: number) => serverApiCall(() => api.getProject(projectId, { cache: "no-cache" }));
export const getProjectReports = async (projectId: number) => serverApiCall(() => api.getProjectReports(projectId, { cache: "no-cache" }));
export const getAllReports = async () => serverApiCall(() => api.getAllReports({ cache: "no-cache" }));
export const getReport = async (reportId: number) => serverApiCall(() => api.getReport(reportId, { cache: "no-cache" }));
export const getAllAnalyzers = async () => serverApiCall(() => api.getAllAnalyzers({ cache: "no-cache" }));
export const postAnalyzer = async (data: AnalyzerCreate) => serverApiCall(() => api.postAnalyzer(data, { cache: "no-cache" }));
export const getAnalyzer = async (analyzerId: number) => serverApiCall(() => api.getAnalyzer(analyzerId, { cache: "no-cache" }));
export const getAnalyzerInputs = async (analyzerId: number) => serverApiCall(() => api.getAnalyzerInputs(analyzerId, { cache: "no-cache" }));
export const getAnalyzerOutputs = async (analyzerId: number) => serverApiCall(() => api.getAnalyzerOutputs(analyzerId, { cache: "no-cache" }));
export const getAnalyzerTemplate = async (data: AnalyzerCreate) => serverApiCall(() => api.getAnalyzerTemplate(data, { cache: "no-cache" }));
export const uploadAnalyzerScript = async (analyzerId: number, data: FileUpload) => serverApiCall(() => api.uploadAnalyzerScript(analyzerId, data, { cache: "no-cache" }));
export const deleteAnalyzerScript = async (analyzerId: number) => serverApiCall(() => api.deleteAnalyzerScript(analyzerId, { cache: "no-cache" }));
export const getAnalyzerScript = async (analyzerId: number) => serverApiCall(() => api.getAnalyzerScript(analyzerId, { cache: "no-cache" }));
export const getAnalyzerRequirements = async (analyzerId: number) => serverApiCall(() => api.getAnalyzerRequirements(analyzerId, { cache: "no-cache" }));
export const uploadAnalyzerRequirements = async (analyzerId: number, data: FileUpload) => serverApiCall(() => api.uploadAnalyzerRequirements(analyzerId, data, { cache: "no-cache" }));
export const runJob = async (analyzer: number, data: JobCreate) => serverApiCall(() => api.runJob(analyzer, data, { cache: "no-cache" }));
export const getAllBatches = async () => serverApiCall(() => api.getAllBatches({ cache: "no-cache" }));
export const getBatch = async (batchId: number) => serverApiCall(() => api.getBatch(batchId, { cache: "no-cache" }));
export const getBatchStats = async (batchId: number) => serverApiCall(() => api.getBatchStats(batchId, { cache: "no-cache" }));