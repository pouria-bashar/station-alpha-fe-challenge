import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: Error };

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Global error boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
          <Card className="max-w-sm w-full">
            <CardHeader>
              <CardTitle className="text-center">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {this.state.error?.message ?? "Unexpected error occurred."}
              </p>
              <Button onClick={() => window.location.reload()}>Reload</Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
