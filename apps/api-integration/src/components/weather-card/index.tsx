import { mapToWeatherIcon } from "@/lib/icon-mapping";

interface WeatherCardProps {
  title: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}
export default function WeatherCard({
  title,
  maxTemp,
  minTemp,
  icon,
}: WeatherCardProps) {
  const Icon = mapToWeatherIcon(icon);
  return (
    <div className="flex h-full flex-col items-center justify-between py-4 bg-background rounded-sm select-none gap-4 p-4">
      <div className="text-xs font-semibold line-clamp-1">{title}</div>
      <Icon.Icon className="w-8 h-8" fill={Icon.color} />
      <div className="flex flex-col items-center">
        <div className="text-xs text-muted-foreground text-center">Max</div>
        <div className="text-sm font-semibold leading-none text-center">
          {maxTemp.toFixed(0)}°
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xs text-muted-foreground text-center">Min</div>
        <div className="text-sm font-semibold leading-none text-center">
          {minTemp.toFixed(0)}°
        </div>
      </div>
    </div>
  );
}
