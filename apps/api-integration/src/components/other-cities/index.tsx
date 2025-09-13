import { useAppConfig } from "@/hooks/useAppConfig";
import { useTopCities } from "@/hooks/useTopCities";
import React from "react";
import CityForecastWrapper from "../city-forecast/wrapper";
import ErrorCard from "../error-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LIMIT = 6;
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
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Other cities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 grid grid-cols-3 md:grid-cols-6 gap-3">
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
    <Card className="border-0">
      <CardContent>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-background rounded-lg p-4 flex flex-col items-center justify-center  border-0"
            >
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-8 rounded-full" />
              <Skeleton className="h-6 w-16" />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
