import CityForecastWrapper from "@/components/city-forecast";
import ErrorCard from "@/components/error-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherCardSkeleton } from "@/components/weather-card/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useTopCities } from "@/hooks/useTopCities";
import React from "react";

const LIMIT = 7;
export default function OtherCities() {
  const { location } = useAppConfig();
  const { data, isLoading, error, refetch } = useTopCities({
    country: location.country,
    limit: LIMIT + 1,
  });
  if (isLoading) return <OtherCitiesSkeleton />;

  if (error)
    return <ErrorCard message="Failed to load top cities" onRetry={refetch} />;

  if (!data?.data?.length)
    return <ErrorCard message="No data" onRetry={refetch} />;

  const filteredData = data.data
    .filter((c) => c.name !== location.name)
    .slice(0, LIMIT);

  return (
    <Card className="border-0 rounded-sm">
      <CardHeader>
        <CardTitle>Other cities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 grid grid-cols-3 md:grid-cols-7 gap-3">
        {filteredData.map((c) => (
          <React.Fragment key={c.id}>
            <CityForecastWrapper
              lat={c.latitude}
              lon={c.longitude}
              city={c.name}
            />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

function OtherCitiesSkeleton() {
  return (
    <Card className="border-0 rounded-sm">
      <CardContent>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <WeatherCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
