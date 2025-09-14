import LocationForecastWrapper from "@/components/location-forecast";
import LocationWeatherWrapper from "@/components/location-weather/wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForecastSection() {
  return (
    <Card className="border-0 rounded-sm">
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-9">
        <div className="col-span-full md:col-span-3">
          <LocationWeatherWrapper />
        </div>
        <LocationForecastWrapper />
      </CardContent>
    </Card>
  );
}
