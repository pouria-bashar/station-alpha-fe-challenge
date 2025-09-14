import { Card, CardContent } from "@/components/ui/card";
import { mapToWeatherIcon } from "@/lib/icon-mapping";
import { format } from "date-fns";

interface LocationWeatherCardProps {
  temperature: number;
  condition: string;
  realFeel: number;
  wind: string;
  pressure: number;
  icon: string;
  sunrise?: number;
  sunset?: number;
}
export default function LocationWeatherCard({
  temperature,
  realFeel,
  wind,
  icon,
  sunrise,
  sunset,
}: LocationWeatherCardProps) {
  const day = format(new Date(), "EEEE");
  const date = format(new Date(), "MMM d, yyyy");

  const Icon = mapToWeatherIcon(icon);
  return (
    <Card className="border-0 rounded-sm bg-background">
      <CardContent className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <div className="text-lg">{day}</div>
          <div className="text-xs text-muted-foreground">{date}</div>
          <div className="flex gap-2 flex-1 items-center">
            <div className="mt-4 text-6xl font-semibold flex-1">
              {temperature.toFixed(0)}°
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-2 flex-col">
          <div className="flex-1 flex items-center justify-center">
            <Icon.Icon className="w-10 h-10" fill={Icon.color} />
          </div>
          <div className="mt-4 space-y-1 text-xs text-muted-foreground flex-1">
            <p>Real Feel: {realFeel.toFixed(0)}°</p>
            <p>Wind: {wind}</p>
          </div>
          <div className="mt-4 space-y-1 text-xs text-muted-foreground">
            <p>
              Sunrise:{" "}
              {sunrise ? format(new Date(sunrise * 1000), "h:mm a") : "N/A"}
            </p>
            <p>
              Sunset:{" "}
              {sunset ? format(new Date(sunset * 1000), "h:mm a") : "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
