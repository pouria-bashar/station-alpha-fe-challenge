import ErrorCard from "@/components/error-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherCard from "@/components/weather-card";
import { WeatherCardSkeleton } from "@/components/weather-card/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useLocationForecast } from "@/hooks/useLocationForecast";
import { format } from "date-fns";

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
    <Card className="border-0 rounded-sm">
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
                <WeatherCard
                  icon={forecast.icon}
                  title={format(forecast.date, "h a")}
                  maxTemp={forecast.max}
                  minTemp={forecast.min}
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
  const isMobile = useIsMobile();
  return (
    <Card className="border-0 rounded-sm">
      <CardContent>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
          {Array.from({ length: isMobile ? 3 : 7 }).map((_, i) => (
            <WeatherCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
