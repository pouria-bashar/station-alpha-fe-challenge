const iconMap: Record<string, string> = {
  "01d": "clear-day.svg",
  "01n": "clear-night.svg",
  "02d": "cloudy-1-day.svg",
  "02n": "cloudy-1-night.svg",
  "03d": "cloudy-2-day.svg",
  "03n": "cloudy-2-night.svg",
  "04d": "cloudy-3-day.svg",
  "04n": "cloudy-3-night.svg",
  "09d": "rainy-1-day.svg",
  "09n": "rainy-1-night.svg",
  "10d": "rainy-2-day.svg",
  "10n": "rainy-2-night.svg",
  "11d": "isolated-thunderstorms-day.svg",
  "11n": "isolated-thunderstorms-night.svg",
  "13d": "snowy-1-day.svg",
  "13n": "snowy-1-night.svg",
  "50d": "fog-day.svg",
  "50n": "fog-night.svg",
};

export function mapToWeatherIconsPath(iconCode: string): string {
  const file = iconMap[iconCode];
  if (file) return `/weather-icons/${file}`; // adjust path as needed
  return `/weather-icons/cloudy.svg`; // fallback icon
}
