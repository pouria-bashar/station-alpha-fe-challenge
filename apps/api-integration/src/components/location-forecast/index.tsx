import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mapToWeatherIconsPath } from "@/lib/icon-mapping";

interface LocationForecastCardProps {
  day: string;
  icon: string;
  temp: string;
  condition: string;
}
export default function LocationForecastCard({
  day,
  icon,
  temp,
  condition,
}: LocationForecastCardProps) {
  return (
    <Card key={day} className="border-0 rounded-sm bg-background">
      <CardContent className="flex flex-col items-center flex-1">
        <div className="text-muted-foreground flex-1">
          {day}
          <div className="mt-3">
            <Separator orientation="horizontal" />
          </div>
        </div>
        <div className="my-2 gap-1 flex flex-col items-center">
          <img
            src={mapToWeatherIconsPath(icon)}
            alt={icon}
            width={40}
            height={40}
          />
          <div className="text-xs text-muted-foreground text-center">
            {condition}
          </div>
        </div>
        <div className="text-lg font-semibold flex-1 flex items-end">
          <div>{temp}°</div>
        </div>
      </CardContent>
    </Card>
  );
}
