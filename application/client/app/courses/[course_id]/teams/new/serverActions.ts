import api from "@/utils/apiUtils";

export async function addTeam(data: FormData, course_id: number) {
    const numberOfTeams = Number(data.get("numberOfTeams") as string);

    if (numberOfTeams < 2){
        await api.postTeam({course_id: course_id});
    }
    else{
        await api.postTeams(course_id, numberOfTeams);
    }
}