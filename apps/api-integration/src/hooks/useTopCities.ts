import { GeoDbCitiesResponse } from "@/types/rapid-api";
import { useQuery } from "@tanstack/react-query";

export const fetchTopCities = async (country: string, limit: number) => {
  const response = await fetch(
    `/api/top-cities?country=${country}&limit=${limit}`
  );
  return response.json();
};

export const useTopCities = ({
  country,
  limit,
}: {
  country: string;
  limit: number;
}) => {
  const { data, isLoading, error, refetch } = useQuery<GeoDbCitiesResponse>({
    queryKey: ["top-cities", country, limit],
    queryFn: () => fetchTopCities(country, limit),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
  });
  return { data, isLoading, error, refetch };
};
