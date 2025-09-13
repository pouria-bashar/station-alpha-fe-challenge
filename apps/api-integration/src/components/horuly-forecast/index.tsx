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
    <div className="flex h-full flex-col items-center justify-between py-4 bg-background rounded-sm select-none">
      <div className="text-xs font-semibold">{format(date, "h a")}</div>

      <div className="my-2 text-2xl">
        <img
          src={mapToWeatherIconsPath(icon)}
          alt={icon}
          width={40}
          height={40}
        />
      </div>

      <div className="text-xl font-semibold leading-none">{temperature}°</div>
    </div>
  );
}
