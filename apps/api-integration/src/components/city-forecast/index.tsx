import ErrorCard from "@/components/error-card";
import WeatherCard from "@/components/weather-card";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationWeather } from "@/hooks/useLocationWeather";
import { WeatherCardSkeleton } from "../weather-card/skeleton";

type CityForecastWrapperProps = {
  lat: number;
  lon: number;
  city: string;
};

export default function CityForecastWrapper({
  lat,
  lon,
  city,
}: CityForecastWrapperProps) {
  const { unit } = useAppConfig();
  const { data, isLoading, error, refetch } = useLocationWeather({
    lat,
    lon,
    unit,
  });

  if (isLoading) return <WeatherCardSkeleton />;

  if (error)
    return (
      <ErrorCard message="Failed to load weather data" onRetry={refetch} />
    );

  if (!data?.main) return <ErrorCard onRetry={refetch} message="No data" />;

  return (
    <WeatherCard
      maxTemp={data.main.temp_max}
      minTemp={data.main.temp_min}
      title={city}
      icon={data.weather[0].icon}
    />
  );
}
