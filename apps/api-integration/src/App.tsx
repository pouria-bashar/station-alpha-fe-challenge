import AppHeader from "@/components/app-header";
import ForecastSection from "@/components/forecast-section";
import HourlyForecastSection from "@/components/horuly-forecast-section";
import MapSection from "@/components/map-section";
import OtherCitiesSection from "@/components/other-cities-section";
import "flag-icons/css/flag-icons.min.css";

export default function App() {
  return (
    <div className="min-h-screen w-full pb-10">
      <AppHeader />
      <main className="mx-auto w-full max-w-[900px] md:px-4">
        <div>
          <div className="space-y-6">
            <ForecastSection />
            <HourlyForecastSection />
            <OtherCitiesSection />
            <MapSection />
          </div>
        </div>
      </main>
    </div>
  );
}
