"use server";

import api from "@/utils/apiUtils";
import { AnalyzerCreate } from "@/extensions/data-contracts";

// Server action for submitting the analyzer
export async function submitAnalyzerAction(formattedData: AnalyzerCreate) {
  try {
    const response = await api.postAnalyzer(formattedData);
    
    if (response.ok) {
      return { success: true, message: "Analyzer submitted successfully!" };
    } else {
      return { success: false, message: `Error submitting Analyzer: ${response.error}` };
    }
  } catch (error) {
    return { success: false, message: `Unexpected error: ${error}` };
  }
}