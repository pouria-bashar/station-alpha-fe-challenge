import { Card, CardContent } from "@/components/ui/card";
import { mapToWeatherIconsPath } from "@/lib/icon-mapping";
import { format } from "date-fns";

interface LocationWeatherCardProps {
  temperature: number;
  condition: string;
  realFeel: number;
  wind: string;
  pressure: number;
  icon: string;
}
export default function LocationWeatherCard({
  temperature,
  condition,
  realFeel,
  wind,
  pressure,
  icon,
}: LocationWeatherCardProps) {
  const day = format(new Date(), "EEEE");
  const date = format(new Date(), "MMM d, yyyy");

  return (
    <Card className="border-0 rounded-sm bg-background">
      <CardContent>
        <div className="text-xs text-zinc-400">{day}</div>
        <div className="text-[10px] text-zinc-500">{date}</div>
        <div className="flex items-center gap-2 mt-2">
          <div>
            <img
              src={mapToWeatherIconsPath(icon)}
              alt={condition}
              width={42}
              height={42}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-4 text-xl font-semibold flex-1">
            {temperature}°
          </div>
        </div>
        <div className="mt-4 space-y-1 text-[11px] text-zinc-400">
          <p>Real Feel: {realFeel}°</p>
          <p>Wind: {wind}</p>
          <p>Pressure: {pressure}MB</p>
        </div>
      </CardContent>
    </Card>
  );
}
