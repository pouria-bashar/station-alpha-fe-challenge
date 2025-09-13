import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationWeather } from "@/hooks/useLocationWeather";
import { cn } from "@/lib/utils";
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
    />
  );
}

export function LocationWeatherSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("rounded-sm border-0 bg-background", className)}>
      <CardContent>
        <div className="space-y-1">
          <Skeleton className="h-3 w-20 bg-card" />
          <Skeleton className="h-3 w-28 bg-card" />
        </div>

        <div className="flex items-end gap-3">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-12 w-28 bg-card" />
            <Skeleton className="h-2.5 w-2.5 rounded-full bg-card mb-2" />
          </div>

          <Skeleton className="h-5 w-5 rounded-full bg-card mb-1" />

          <Skeleton className="h-4 w-14 bg-card mb-1" />
        </div>

        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-40 bg-card" />
          <Skeleton className="h-3 w-28 bg-card" />
          <Skeleton className="h-3 w-36 bg-card" />
        </div>
      </CardContent>
    </Card>
  );
}
