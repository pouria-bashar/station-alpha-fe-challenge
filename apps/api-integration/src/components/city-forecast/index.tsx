import { mapToWeatherIconsPath } from "@/lib/icon-mapping";

interface CityForecastCardProps {
  city: string;
  temperature: number;
  icon: string;
}
export default function CityForecastCard({
  city,
  temperature,
  icon,
}: CityForecastCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-between py-4 bg-background rounded-sm select-none gap-4">
      <div className="text-xs font-semibold line-clamp-1">{city}</div>
      <img
        src={mapToWeatherIconsPath(icon)}
        alt={icon}
        width={40}
        height={40}
      />
      <div className="text-lg font-semibold leading-none">{temperature}°</div>
    </div>
  );
}
