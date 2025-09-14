import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationWeather } from "@/hooks/useLocationWeather";
import TodayForecastCard from ".";
import ErrorCard from "../error-card";

export default function LocationWeatherWrapper() {
  const { location, unit } = useAppConfig();

  const { data, isLoading, error, refetch } = useLocationWeather({
    lat: location.lat,
    lon: location.lon,
    unit: unit,
  });

  if (isLoading) return <LocationWeatherSkeleton />;
  if (error)
    return (
      <ErrorCard message="Failed to load weather data" onRetry={refetch} />
    );
  if (!data?.main) return <ErrorCard message="No data" onRetry={refetch} />;

  return (
    <TodayForecastCard
      temperature={data.main.temp}
      condition={data.weather[0].main}
      realFeel={data.main.feels_like}
      wind={data.wind.speed.toString()}
      pressure={data.main.pressure}
      icon={data.weather[0].icon}
      sunrise={data.sys?.sunrise}
      sunset={data.sys?.sunset}
    />
  );
}

export function LocationWeatherSkeleton() {
  return (
    <Card className="rounded-sm border-0 bg-background">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 bg-card" />
          <Skeleton className="h-3 w-28 bg-card" />
        </div>

        <Skeleton className="h-12 w-12 bg-card rounded-full" />

        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-40 bg-card" />
          <Skeleton className="h-3 w-28 bg-card" />
          <Skeleton className="h-3 w-36 bg-card" />
        </div>
      </CardContent>
    </Card>
  );
}
