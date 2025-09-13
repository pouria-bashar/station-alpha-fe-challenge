import { useAppConfig } from "@/hooks/useAppConfig";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const customMarkerIcon = L.icon({
  iconUrl: "https://freesvg.org/img/map-pin.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const DEFAULT_ZOOM = 3;
export default function Map() {
  const { location } = useAppConfig();

  const position: LatLngTuple = [location?.lat, location?.lon];

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <div>Global map</div>
          <p className="text-muted-foreground text-xs">
            Click on the map to see the weather in your city
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[340px] w-full overflow-hidden rounded-xl">
          <MapContainer
            center={position}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom={false}
            doubleClickZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function MapMarker() {
  const map = useMap();

  const { location, setLocation } = useAppConfig();

  const position: LatLngTuple = [location?.lat, location?.lon];

  useEffect(() => {
    if (location && map) {
      map.setView([location?.lat, location?.lon], DEFAULT_ZOOM);
    }
  }, [location, map]);

  const onPick = (lat: number, lon: number, name: string, country: string) => {
    setLocation({ name, country, lat, lon });
  };

  const setMarker = () => {
    // TODO
  };
  const setLabel = () => {
    // TODO
  };

  return (
    <>
      <ClickHandler onPick={onPick} setMarker={setMarker} setLabel={setLabel} />
      <Marker position={position} icon={customMarkerIcon} />
    </>
  );
}

function ClickHandler({
  onPick,
  setMarker,
  setLabel,
}: {
  onPick: (lat: number, lon: number, name: string, country: string) => void;
  setMarker: (pos: [number, number]) => void;
  setLabel: (label: string) => void;
}) {
  useMapEvents({
    async click(e: L.LeafletMouseEvent) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      try {
        const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
        const data = await res.json();

        const name = data?.[0]
          ? data[0].name
          : `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        setMarker([lat, lon]);
        setLabel(name);
        onPick(lat, lon, name, data[0].country);
      } catch {
        const fallback = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        setMarker([lat, lon]);
        setLabel(fallback);
        onPick(lat, lon, fallback, "Unknown");
      }
    },
  });
  return null;
}
