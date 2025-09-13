import { GeocodeResponseItem } from "@/types/open-weather";
import { useQuery } from "@tanstack/react-query";

export const fetchGeoSearch = async (query: string, limit: number) => {
  const res = await fetch(
    `/api/geo?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  return res.json();
};

export const useGeoSearch = ({
  query,
  limit,
}: {
  query: string;
  limit: number;
}) => {
  const { data, isFetching, isFetched } = useQuery<GeocodeResponseItem[]>({
    queryKey: ["geo-search", query],
    queryFn: () => fetchGeoSearch(query, limit),
    enabled: query.trim().length >= 2,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    select: (data) =>
      data.map((item) => ({
        ...item,
        id: `${item.name}-${item.lat}-${item.lon}`,
      })),
  });
  return { data, isFetching, isFetched };
};
