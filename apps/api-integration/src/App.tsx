import "flag-icons/css/flag-icons.min.css";
import AppHeader from "./components/app-header";
import HourlyForecastWrapper from "./components/horuly-forecast/wrapper";
import LocationForecastWrapper from "./components/location-forecast/wrapper";
import LocationWeatherWrapper from "./components/location-weather/wrapper";
import Map from "./components/map";
import OtherCities from "./components/other-cities";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen w-full pb-10">
      <AppHeader />
      <main className="mx-auto w-full max-w-[900px] md:px-4">
        <div>
          <div className="space-y-6">
            <ForecastSection />
            <HourlyForecastWrapper />
            <OtherCities />
            <Map />
          </div>
        </div>
      </main>
    </div>
  );
}

const ForecastSection = () => {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-9">
        {/* big monday card */}
        <div className="md:col-span-3">
          <LocationWeatherWrapper />
        </div>
        <LocationForecastWrapper />
      </CardContent>
    </Card>
  );
};
