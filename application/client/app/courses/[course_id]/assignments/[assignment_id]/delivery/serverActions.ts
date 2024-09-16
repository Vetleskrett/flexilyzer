"use server";
import { ProjectCreate } from "@/extensions/data-contracts";
import api from "@/utils/apiUtils";

// Fetch assignment project based on assignment_id and team_id
export const getAssignmentProject = async (assignment_id: number, team_id: number) => {
  try {
    const response = await api.getAssignmentProject(assignment_id, team_id);
    return response.data;
  } catch (error) {
    console.error("Error fetching assignment project:", error);
    throw new Error("Unable to fetch assignment project.");
  }
};

// Fetch assignment metadata for a specific assignment
export const fetchAssignmentMetadata = async (assignment_id: number) => {
  try {
    const response = await api.getAssignmentMetadata(assignment_id, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${response.status} - ${response.error}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assignment metadata:", error);
    throw new Error("Unable to fetch assignment metadata.");
  }
};

// Submit project form
export const submitProjectForm = async (data: ProjectCreate) => {
  try {
    await api.createProject(data);
  } catch (error) {
    console.error("Error submitting project form:", error);
    throw new Error("Unable to submit project form.");
  }
};
