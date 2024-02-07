import api from "@/api_utils";
import AnalyzerTabs from "@/components/reportPageComponents/AnalyzerTabs";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

interface Props {
  params: { course_id: string; assignment_id: string };
}

export default async function TeamReportsPage({ params }: Props) {


  // const searchParams = useSearchParams();

  // const team_id = searchParams.get("team_id");
  // const batch = searchParams.get("batch");

  // // Define the fetch function
  // const fetchTeamBatches = async () => {
  //   const resp = await api.get
  //   if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
  //   return resp.data;
  // };

  // // Use useQuery hook to fetch data
  // const { data, isLoading, error } = useQuery(
  //   ["teamBatches", { team_id, batch }],
  //   fetchTeamBatches,
  //   {
  //     // Optionally, you can enable/disable refetching on window focus
  //     refetchOnWindowFocus: false,
  //     // Only proceed with the query if team_id is not null
  //     enabled: !!team_id,
  //   }
  // );

  // Fetch analyzers for assignment

  return (
    <>
      
    </>
  );
}

// Fetch all batches for assignment and specific analyzer
