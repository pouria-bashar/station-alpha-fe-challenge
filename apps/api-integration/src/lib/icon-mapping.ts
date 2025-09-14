import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
} from "lucide-react";

type WeatherIcon = {
  Icon: LucideIcon;
  className?: string;
  color: string; // stroke color
};

// https://openweathermap.org/weather-conditions
const iconMap: Record<string, WeatherIcon> = {
  "01d": { Icon: Sun, color: "#facc15" },
  "01n": { Icon: Moon, color: "#93c5fd" },
  "02d": { Icon: CloudSun, color: "#fcd34d" },
  "02n": { Icon: CloudMoon, color: "#bfdbfe" },
  "03d": { Icon: Cloud, color: "#9ca3af" },
  "03n": { Icon: Cloud, color: "#6b7280" },
  "04d": { Icon: Cloud, color: "#6b7280" },
  "04n": { Icon: Cloud, color: "#4b5563" },
  "09d": { Icon: CloudDrizzle, color: "#3b82f6" },
  "09n": { Icon: CloudDrizzle, color: "#2563eb" },
  "10d": { Icon: CloudRain, color: "#3b82f6" },
  "10n": { Icon: CloudRain, color: "#2563eb" },
  "11d": { Icon: CloudLightning, color: "#fbbf24" },
  "11n": { Icon: CloudLightning, color: "#f59e0b" },
  "13d": { Icon: Snowflake, color: "#e0f2fe" },
  "13n": { Icon: Snowflake, color: "#bae6fd" },
  "50d": { Icon: CloudFog, color: "#9ca3af" },
  "50n": { Icon: CloudFog, color: "#6b7280" },
};

export function mapToWeatherIcon(iconCode: string): WeatherIcon {
  return iconMap[iconCode] || { Icon: Cloud, color: "#9ca3af" };
}
