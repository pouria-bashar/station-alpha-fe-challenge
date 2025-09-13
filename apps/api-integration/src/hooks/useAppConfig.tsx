import * as React from "react";

export type Location = {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
};

export type Unit = "metric" | "imperial";

type AppConfigContextType = {
  location: Location;
  setLocation: (location: Location) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
};

const AppConfigContext = React.createContext<AppConfigContextType | undefined>(
  undefined
);

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = React.useState<Location>({
    name: "Sydney",
    country: "AU",
    lat: -33.8688,
    lon: 151.2093,
  });

  const [unit, setUnit] = React.useState<Unit>("metric");

  const value = React.useMemo(
    () => ({ location, setLocation, unit, setUnit }),
    [location, setLocation, unit]
  );

  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppConfig() {
  const ctx = React.useContext(AppConfigContext);
  if (!ctx)
    throw new Error("useAppConfig must be used inside AppConfigProvider");
  return ctx;
}
