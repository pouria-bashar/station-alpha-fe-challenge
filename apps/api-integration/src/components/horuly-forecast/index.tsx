import { mapToWeatherIconsPath } from "@/lib/icon-mapping";
import { format } from "date-fns";

type HourlyForecastCardProps = {
  icon: string;
  date: Date;
  temperature: number;
};
export default function HourlyForecastCard({
  icon,
  date,
  temperature,
}: HourlyForecastCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-between py-4 bg-background rounded-sm select-none gap-4">
      <div className="text-xs font-semibold">{format(date, "h a")}</div>
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
