import axios from "axios";
import {
  getWeatherForLocationEndpoint,
  getCoordinatesEndpoint,
  getDirectionMatrixEndpoint,
  trips,
} from "@/services";

const fetchCoordinates = async (city: string) => {
  try {
    const url = getCoordinatesEndpoint(city);
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "MySchoolTripPlanner/1.0 (contact@example.com)",
      },
    });

    const data = response.data;

    if (data.length === 0) {
      throw new Error(`No coordinates found for city: ${city}`);
    }

    const { lat, lon } = data[0];
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon),
    };
  } catch (error) {
    console.error("Failed to fetch coordinates:", error);
    throw error;
  }
};

export const filterTripsByDistanceAndBudget = async (
  city: string,
  rangeInSeconds: number,
  budget: number
) => {
  const start = await fetchCoordinates(city);
  const endpoint = getDirectionMatrixEndpoint();

  try {
    const response = await axios.post(endpoint, {
      locations: [[start.lng, start.lat]].concat(
        trips.map((trip) => trip.coordinates)
      ),
      sources: [0],
      destinations: Array.from({ length: trips.length }, (_, i) => i + 1),
    });

    const durations = response.data.durations[0];
    return trips.filter(
      (trip, i) =>
        durations[i] <= rangeInSeconds && trip.available && trip.price <= budget
    );
  } catch (error) {
    console.error("Failed to fetch route for trip");
  }
};

export const getWeatherForCity = async (city: string) => {
  try {
    const coordinates = await fetchCoordinates(city);
    const weatherUrl = getWeatherForLocationEndpoint(coordinates);

    const response = await axios.get(weatherUrl);

    const timeseries = response.data.properties.timeseries?.[0]?.data;
    const summary: string =
      timeseries?.next_1_hours?.summary?.symbol_code || "unknown";
    const temperature: number = timeseries?.instant?.details?.air_temperature;

    return {
      summary,
      temperature,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};
