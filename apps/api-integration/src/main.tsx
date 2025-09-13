import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GlobalErrorBoundary } from "./components/error-boundary/index.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { AppConfigProvider } from "./hooks/useAppConfig.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppConfigProvider>
          <ThemeProvider defaultTheme="system">
            <App />
          </ThemeProvider>
        </AppConfigProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
