import { useQuery, UseQueryOptions, QueryKey } from "react-query";

interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data: T;
  error?: string;
  statusText?: string;
}

// A more precise definition for the API call function type
type ApiCallFunction<T> = (...args: any[]) => Promise<ApiResponse<T>>;

function useFetchResource<T>(
  queryKey: QueryKey,
  apiCall: ApiCallFunction<T>,
  apiArgs: any[] = [],
  options: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn"> = {}
) {
  // Define the fetch function
  const fetchData = async (): Promise<T> => {
    const resp = await apiCall(...apiArgs);
    if (!resp.ok)
      throw new Error(`${resp.status} - ${resp.statusText || resp.error}`);
    return resp.data;
  };

  // Adjust the useQuery call to match the expected generic parameters
  return useQuery<T, Error>(queryKey, () => fetchData(), {
    ...options,

    refetchOnWindowFocus: options.refetchOnWindowFocus,
  });
}

export default useFetchResource;
