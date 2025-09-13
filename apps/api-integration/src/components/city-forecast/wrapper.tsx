import { Skeleton } from "@/components/ui/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationWeather } from "@/hooks/useLocationWeather";
import CityCard from ".";
import ErrorCard from "../error-card";

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

  if (isLoading) return <CityCardSkeleton />;
  if (error)
    return (
      <ErrorCard message="Failed to load weather data" onRetry={refetch} />
    );
  if (!data?.main) return <ErrorCard onRetry={refetch} message="No data" />;

  return (
    <CityCard
      temperature={data.main.temp}
      city={city}
      icon={data.weather[0].icon}
    />
  );
}

export function CityCardSkeleton() {
  return (
    <div className="rounded-2xl bg-background px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32 bg-card" />
          <Skeleton className="h-5 w-40 bg-card" />
          <Skeleton className="h-3 w-20 bg-card" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full bg-card" />
          <Skeleton className="h-5 w-16 bg-card" />
        </div>
      </div>
    </div>
  );
}
