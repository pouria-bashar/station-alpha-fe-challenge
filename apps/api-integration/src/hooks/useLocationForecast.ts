import { ForecastListItem, ForecastResponse } from "@/types/open-weather";
import { useQuery } from "@tanstack/react-query";
import { Unit } from "./useAppConfig";

export const fetchForecast = async (lat: number, lon: number, unit: Unit) => {
  const response = await fetch(
    `/api/forecast?lat=${lat}&lon=${lon}&units=${unit}`
  );

  return response.json();
};

export type GroupedForecastResponse = ReturnType<typeof groupToDays>;

function groupToDays(list: ForecastListItem[], numberOfDays: number = 6) {
  const days = new Map<string, ForecastListItem[]>();

  for (const item of list) {
    const dateKey = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
    if (!days.has(dateKey)) days.set(dateKey, []);
    days.get(dateKey)!.push(item);
  }

  return groupForecast(days, numberOfDays);
}

function groupToHours(list: ForecastListItem[], numberOfHours: number = 24) {
  const days = new Map<string, ForecastListItem[]>();

  for (const item of list) {
    const dateKey = item.dt_txt; // "YYYY-MM-DD"
    if (!days.has(dateKey)) days.set(dateKey, []);
    days.get(dateKey)!.push(item);
  }

  return groupForecast(days, numberOfHours);
}

const groupForecast = (
  days: Map<string, ForecastListItem[]>,
  numberOfHours: number = 8 // Every 3 hours
) => {
  return [...days.entries()]
    .slice(1, numberOfHours)
    .map(([date, items], index) => {
      const min = Math.min(...items.map((i) => i.main.temp_min));
      const max = Math.max(...items.map((i) => i.main.temp_max));
      const mid = items[Math.floor(items.length / 2)];
      return {
        date: new Date(date),
        min,
        max,
        condition: mid.weather[0].main,
        icon: mid.weather[0].icon,
        id: index,
      };
    });
};

export const useLocationForecast = ({
  lat,
  lon,
  unit,
  count,
  type = "days",
}: {
  lat: number;
  lon: number;
  unit: Unit;
  count: number;
  type: "days" | "hours";
}) => {
  const { data, isLoading, error, refetch } = useQuery<
    ForecastResponse,
    Error,
    GroupedForecastResponse
  >({
    queryKey: ["location-forecast", lat, lon, unit],
    queryFn: () => fetchForecast(lat, lon, unit),
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // refetchInterval: 10 * 60 * 1000, // 10 minutes
    select: (raw) => {
      return type === "days"
        ? groupToDays(raw.list, count)
        : groupToHours(raw.list, count);
    },
  });
  return { data, isLoading, error, refetch };
};
