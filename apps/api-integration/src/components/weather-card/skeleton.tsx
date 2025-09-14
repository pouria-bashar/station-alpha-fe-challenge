import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherCardSkeleton() {
  return (
    <Card className="bg-background text-card-foreground border-0 min-h-[220px]">
      <CardContent className="flex flex-col justify-between items-center gap-4 h-full">
        <Skeleton className="h-3 w-10 bg-card" />
        <Skeleton className="h-8 w-8 rounded-full bg-card" />
        <Skeleton className="h-3 w-10 bg-card" />
        <Skeleton className="h-3 w-10 bg-card" />
      </CardContent>
    </Card>
  );
}
