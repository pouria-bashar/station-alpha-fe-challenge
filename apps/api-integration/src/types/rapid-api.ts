// types/geodb.ts

export interface GeoDbCity {
  id: number;
  wikiDataId: string;
  type: "CITY" | string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
}

export interface GeoDbLink {
  rel: "first" | "next" | "prev" | "last" | string;
  href: string;
}

export interface GeoDbMetadata {
  currentOffset: number;
  totalCount: number;
}

export interface GeoDbCitiesResponse {
  data: GeoDbCity[];
  links: GeoDbLink[];
  metadata: GeoDbMetadata;
}
