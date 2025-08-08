import { filterTripsByDistanceAndBudget, getWeatherForCity } from "@/api";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "Reisevorschlaege",
      "Finden Sie Vorschlaege fuer Klassenfahrten auf Basis von Benutzereingaben.",
      {
        classSize: z.number().min(1),
        departure: z.string(),
        maxTravelTime: z.number().min(1),
        budget: z.number().min(1),
        date: z.string(),
      },
      async ({ classSize, departure, maxTravelTime, budget, date }) => {
        const filtered = await filterTripsByDistanceAndBudget(
          departure,
          maxTravelTime * 3600,
          budget
        );

        return {
          content: [
            {
              type: "text",
              text:
                filtered && filtered.length > 0
                  ? `Ich habe folgende Moeglichkeiten gefunden:\n\n${filtered
                      .map((t) => `• ${t.name} in ${t.city} (€${t.price})`)
                      .join("\n")}`
                  : "Leider keine passenden Vorschlaege gefunden.",
            },
          ],
        };
      }
    );
    server.tool(
      "Wettervorhersage",
      "Holen Sie sich die Wettervorhersage fuer eine bestimmte Stadt.",
      {
        city: z.string(),
      },
      async ({ city }) => {
        const weatherData = await getWeatherForCity(city);
        return {
          content: [
            {
              type: "text",
              text: weatherData
                ? `Das Wetter in ${city} wird voraussichtlich ${weatherData.summary} mit einer Temperatur von ${weatherData.temperature}°C sein.`
                : `Entschuldigung, ich konnte das Wetter fuer ${city} nicht abrufen.`,
            },
          ],
        };
      }
    );

    server.prompt(
      "klassenfahrtPlanen",
      "Hilf Lehrkraeften, eine passende Klassenfahrt zu planen und gib auch das Wetter fuer die Orte an.",
      {
        classSize: z.string(),
        departure: z.string(),
        maxTravelTime: z.string(),
        budget: z.string(),
        date: z.string(),
      },
      async ({ classSize, departure, maxTravelTime, budget, date }) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Hallo, ich moechte eine Klassenfahrt fuer Jugendliche in Deutschland organisieren: ${classSize} Jugendliche aus ${departure}, maximal ${maxTravelTime} Stunden Fahrtzeit, Budget ${budget} € pro Person, Reisedatum ist der ${date}. Bitte gib mir außerdem die aktuelle Temperatur in den passenden Staedten.`,
            },
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        reisevorschlaege: {
          description:
            "Erhalten Sie gefilterte Vorschlaege fuer Klassenfahrten",
        },
        Wettervorhersage: {
          description: "Holen Sie sich die Wettervorhersage",
        },
      },
      prompts: {
        klassenfahrtPlanen: {
          description: "whatever",
        },
      },
    },
  },
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
