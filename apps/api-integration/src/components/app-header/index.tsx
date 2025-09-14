import { useAppConfig } from "@/hooks/useAppConfig";

import CitySearchInput from "@/components/city-search-input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Thermometer } from "lucide-react";
import { useTheme } from "next-themes";

export default function AppHeader() {
  const { location, unit, setUnit } = useAppConfig();
  const { theme, setTheme } = useTheme();

  return (
    <header className="mx-auto w-full px-4 py-4 flex items-center gap-3 bg-card mb-8 flex-wrap">
      <div className="ml-1 text-sm min-w-fit flex items-center gap-2 flex-1">
        <span className={`fi fi-${location?.country.toLowerCase()} text-xl`} />
        <span className="font-medium  md:text-xl line-clamp-1">
          {location?.name}, {location?.country}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CitySearchInput />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          className="flex items-center gap-2"
        >
          <Thermometer className="h-4 w-4" />
          <span className="font-mono text-sm">
            {unit === "metric" ? "°C" : "°F"}
          </span>
        </Button>
        <Button
          size="icon"
          className="rounded-full border-1"
          variant="outline"
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
