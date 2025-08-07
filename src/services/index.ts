import { Coordinate, Trip } from "@/types";

export const getWeatherForLocationEndpoint = (location: Coordinate) => {
  return `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.lat}&lon=${location.lng}`;
};

export const getCoordinatesEndpoint = (city: string) => {
  return `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    city
  )}`;
};

export const getDirectionMatrixEndpoint = () => {
  return `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${process.env.NEXT_PUBLIC_ORS_API_KEY}`;
};

export const trips: Trip[] = [
  {
    name: "Berlin Youth Hostel",
    city: "Berlin",
    price: 120,
    coordinates: [13.405, 52.52],
    available: true,
  },
  {
    name: "Munich Backpackers",
    city: "Munich",
    price: 140,
    coordinates: [11.582, 48.1351],
    available: false,
  },
  {
    name: "Hamburg Hostel Central",
    city: "Hamburg",
    price: 110,
    coordinates: [9.9937, 53.5511],
    available: true,
  },
  {
    name: "Cologne Youth Stay",
    city: "Cologne",
    price: 115,
    coordinates: [6.9603, 50.9375],
    available: true,
  },
  {
    name: "Frankfurt Hostel",
    city: "Frankfurt",
    price: 125,
    coordinates: [8.6821, 50.1109],
    available: false,
  },
  {
    name: "Stuttgart City Hostel",
    city: "Stuttgart",
    price: 130,
    coordinates: [9.1829, 48.7758],
    available: true,
  },
  {
    name: "Düsseldorf Youth Spot",
    city: "Düsseldorf",
    price: 135,
    coordinates: [6.7735, 51.2277],
    available: true,
  },
  {
    name: "Leipzig Backpackers",
    city: "Leipzig",
    price: 105,
    coordinates: [12.3731, 51.3397],
    available: false,
  },
  {
    name: "Dresden Youth Base",
    city: "Dresden",
    price: 100,
    coordinates: [13.7373, 51.0504],
    available: true,
  },
  {
    name: "Hanover Hostel",
    city: "Hanover",
    price: 115,
    coordinates: [9.732, 52.3759],
    available: true,
  },
  {
    name: "Nuremberg Hostel Hub",
    city: "Nuremberg",
    price: 120,
    coordinates: [11.0767, 49.4521],
    available: false,
  },
  {
    name: "Freiburg Youth Lodge",
    city: "Freiburg",
    price: 130,
    coordinates: [7.8522, 47.999],
    available: true,
  },
  {
    name: "Heidelberg Hostel",
    city: "Heidelberg",
    price: 125,
    coordinates: [8.6821, 49.3988],
    available: true,
  },
  {
    name: "Bremen Backpackers Inn",
    city: "Bremen",
    price: 115,
    coordinates: [8.8017, 53.0793],
    available: false,
  },
  {
    name: "Kiel Youth Haven",
    city: "Kiel",
    price: 110,
    coordinates: [10.1356, 54.3233],
    available: true,
  },
  {
    name: "Aachen Youth Hostel",
    city: "Aachen",
    price: 105,
    coordinates: [6.0839, 50.7753],
    available: true,
  },
  {
    name: "Würzburg Hostel",
    city: "Würzburg",
    price: 120,
    coordinates: [9.9312, 49.7913],
    available: true,
  },
  {
    name: "Regensburg Youth Stop",
    city: "Regensburg",
    price: 110,
    coordinates: [12.0956, 49.0134],
    available: false,
  },
  {
    name: "Erfurt Youth Spot",
    city: "Erfurt",
    price: 100,
    coordinates: [11.0299, 50.9848],
    available: true,
  },
  {
    name: "Rostock City Hostel",
    city: "Rostock",
    price: 115,
    coordinates: [12.131, 54.0924],
    available: true,
  },
];
