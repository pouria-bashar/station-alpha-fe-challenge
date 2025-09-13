import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationForecast } from "@/hooks/useLocationForecast";
import { format } from "date-fns";
import LocationForecastCard from ".";
import ErrorCard from "../error-card";

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
        <LocationForecastCard
          key={d.id}
          day={format(d.date, "EEE")}
          icon={d.icon}
          temp={d.max.toString()}
          condition={d.condition}
        />
      ))}
    </div>
  );
}

export function LocationForecastSkeleton() {
  return (
    <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {Array.from({ length: DAYS }).map((_, i) => (
        <Card
          key={i}
          className="border-0 rounded-2xl min-h-[140px] flex items-center justify-center bg-background"
        >
          <CardContent className="flex flex-col items-center justify-between h-full">
            <Skeleton className="h-3 w-10 bg-card" />
            <Skeleton className="h-4 w-6 rounded-full bg-card" />
            <Skeleton className="h-4 w-8 bg-card" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
