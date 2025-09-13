export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point?: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
}

export interface MinutelyWeather {
  dt: number;
  precipitation: number;
}

export interface HourlyWeather
  extends Omit<CurrentWeather, "sunrise" | "sunset"> {
  pop?: number;
  rain?: { "1h": number };
}

export interface DailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise?: number;
  moonset?: number;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point?: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  clouds: number;
  pop?: number;
  rain?: number;
  uvi?: number;
  weather: WeatherCondition[];
}

export interface GeocodeResponseItem {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  id: string;
}

// OpenWeather Current Weather API (v2.5) response subset
export interface CurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: WeatherCondition[];
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind: { speed: number; deg: number };
  clouds?: { all: number };
  dt: number;
  sys?: { country?: string; sunrise?: number; sunset?: number };
  timezone?: number;
  name: string;
  cod: number;
}

export interface ForecastListItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    feels_like: number;
    wind_speed: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain: number;
  weather: WeatherCondition[];
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise?: number;
    sunset?: number;
    coord: { lat: number; lon: number };
  };
}
