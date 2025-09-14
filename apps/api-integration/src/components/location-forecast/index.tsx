import ErrorCard from "@/components/error-card";
import WeatherCard from "@/components/weather-card";
import { WeatherCardSkeleton } from "@/components/weather-card/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationForecast } from "@/hooks/useLocationForecast";
import { format } from "date-fns";

const DAYS = 6;
export default function LocationForecastWrapper() {
  const { location, unit } = useAppConfig();

  const { data, isLoading, error, refetch } = useLocationForecast({
    lat: location.lat,
    lon: location.lon,
    unit: unit,
    count: DAYS,
    type: "days",
  });

  if (isLoading) return <LocationForecastSkeleton />;
  if (error)
    return (
      <ErrorCard message="Failed to load week days data" onRetry={refetch} />
    );
  if (!data) return <ErrorCard message="No data" onRetry={refetch} />;

  return (
    <div className="md:col-span-6 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {data?.map((d) => (
        <WeatherCard
          key={d.id}
          title={format(d.date, "EEE")}
          icon={d.icon}
          maxTemp={d.max}
          minTemp={d.min}
        />
      ))}
    </div>
  );
}

export function LocationForecastSkeleton() {
  return (
    <div className="md:col-span-6 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <WeatherCardSkeleton key={i} />
      ))}
    </div>
  );
}
