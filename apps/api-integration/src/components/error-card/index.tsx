import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

type ErrorCardProps = {
  message: string;
  onRetry: () => void;
  className?: string;
};
export default function ErrorCard({
  message,
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <Card
      className={cn(
        "rounded-sm col-span-6 items-center justify-center border-0",
        className
      )}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <div className="text-sm font-medium text-destructive">{message}</div>
        {onRetry && (
          <Button variant="destructive" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
