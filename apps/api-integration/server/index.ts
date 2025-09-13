import dotenv from "dotenv";
import express from "express";
import { GeocodeResponseItem } from "../src/types/open-weather";

dotenv.config();

const app = express();

const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const RAPID_API_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const noKeyResponse = (res: express.Response) => {
  return res.status(500).json({ error: "Missing OPEN_WEATHER_KEY" });
};

const missingLatLonResponse = (res: express.Response) => {
  return res.status(400).json({ error: "Missing lat/lon" });
};

app.get("/api/weather", async (_req, res) => {
  const { lat, lon, units } = _req.query;

  if (!OPEN_WEATHER_KEY) {
    return noKeyResponse(res);
  }

  if (!lat || !lon) {
    return missingLatLonResponse(res);
  }

  const url = new URL(`${OPEN_WEATHER_BASE_URL}/weather`);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("units", units);
  url.searchParams.set("appid", OPEN_WEATHER_KEY);

  const openWeatherRes = await fetch(url.toString());

  if (!openWeatherRes.ok) {
    return res.status(500).json({ error: "Upstream error" });
  }
  const data = await openWeatherRes.json();
  return res.status(200).json(data);
});

app.get("/api/forecast", async (_req, res) => {
  try {
    const { lat, lon, units = "metric" } = _req.query;

    if (!OPEN_WEATHER_KEY) {
      return noKeyResponse(res);
    }

    if (!lat || !lon) {
      return missingLatLonResponse(res);
    }

    const url = new URL(`${OPEN_WEATHER_BASE_URL}/forecast`);
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("units", units);
    url.searchParams.set("appid", OPEN_WEATHER_KEY);

    const openWeatherRes = await fetch(url.toString());

    if (!openWeatherRes.ok) {
      return res.status(500).json({ error: "Upstream error" });
    }
    const data = await openWeatherRes.json();

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reverse-geocode", async (_req, res) => {
  try {
    const { lat, lon } = _req.query;

    if (!OPEN_WEATHER_KEY) {
      return noKeyResponse(res);
    }

    if (!lat || !lon) {
      return missingLatLonResponse(res);
    }

    const url = new URL(`${OPEN_WEATHER_BASE_URL}/geo/1.0/reverse`);
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("limit", "1");
    url.searchParams.set("appid", OPEN_WEATHER_KEY);

    const reverseGeocodeRes = await fetch(url.toString());

    if (!reverseGeocodeRes.ok) {
      return res.status(500).json({ error: "Upstream error" });
    }

    const data = await reverseGeocodeRes.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/top-cities", async (_req, res) => {
  try {
    const { country, limit } = _req.query;

    if (!RAPID_API_KEY) {
      return res.json({ error: "Missing RAPID_API_KEY" }, { status: 500 });
    }

    const url = `${RAPID_API_BASE_URL}/cities?types=CITY&countryIds=${country}&limit=${limit}&sort=-population`;

    const topCitiesRes = await fetch(url, {
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
      },
    });

    if (!topCitiesRes.ok) {
      return res.status(500).json({ error: "Upstream error" });
    }

    const data = await topCitiesRes.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/geo", async (_req, res) => {
  try {
    const { q, limit } = _req.query;

    if (!OPEN_WEATHER_KEY) {
      return res.json({ error: "Missing OPEN_WEATHER_KEY" }, { status: 500 });
    }

    if (!q.trim().length) {
      return res.json([]);
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      q
    )}&limit=${limit}&appid=${OPEN_WEATHER_KEY}`;

    const geoRes = await fetch(url, { cache: "no-store" });

    const json = (await geoRes.json()) as GeocodeResponseItem[];

    return res.status(200).json(json);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => console.log("API on http://localhost:4000"));
