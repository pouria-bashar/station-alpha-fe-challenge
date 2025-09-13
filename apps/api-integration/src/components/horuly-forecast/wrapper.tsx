import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationForecast } from "@/hooks/useLocationForecast";
import HourlyForecastCard from ".";
import ErrorCard from "../error-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export default function HourlyForecastWrapper() {
  const { location, unit } = useAppConfig();
  const { data, isLoading, error, refetch } = useLocationForecast({
    lat: location.lat,
    lon: location.lon,
    unit: unit,
    count: 10,
    type: "hours",
  });

  if (isLoading) return <HourlyForecastSkeleton />;
  if (error)
    return (
      <ErrorCard message="Failed to load hourly forecast" onRetry={refetch} />
    );
  if (!data) return <ErrorCard message="No data" onRetry={refetch} />;

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent>
            {data.map((forecast, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7"
              >
                <HourlyForecastCard
                  icon={forecast.icon}
                  date={forecast.date}
                  temperature={forecast.max}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

function HourlyForecastSkeleton() {
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
