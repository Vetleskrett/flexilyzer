"use server";

import api from "@/utils/apiUtils";

export async function fetchTeams(course_id: number) {
    "use server";

    const resp = await api.getCourseTeams(course_id);
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
};