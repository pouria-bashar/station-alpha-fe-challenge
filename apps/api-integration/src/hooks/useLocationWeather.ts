import { CurrentWeatherResponse } from "@/types/open-weather";
import { useQuery } from "@tanstack/react-query";
import { Unit } from "./useAppConfig";

export const fetchWeather = async (lat: number, lon: number, unit: Unit) => {
  const response = await fetch(
    `/api/weather?lat=${lat}&lon=${lon}&units=${unit}`
  );
  return response.json();
};

export const useLocationWeather = ({
  lat,
  lon,
  unit,
}: {
  lat: number;
  lon: number;
  unit: Unit;
}) => {
  const { data, isLoading, error, refetch } = useQuery<CurrentWeatherResponse>({
    queryKey: ["location-weather", lat, lon, unit],
    queryFn: () => fetchWeather(lat, lon, unit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
  return { data, isLoading, error, refetch };
};
