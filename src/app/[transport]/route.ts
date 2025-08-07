import { filterTripsByDistanceAndBudget, getWeatherForCity } from "@/api";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "Reisevorschläge",
      "Finden Sie Vorschläge für Klassenfahrten auf Basis von Benutzereingaben.",
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
                  ? `Ich habe folgende Möglichkeiten gefunden:\n\n${filtered
                      .map((t) => `• ${t.name} in ${t.city} (€${t.price})`)
                      .join("\n")}`
                  : "Leider keine passenden Vorschläge gefunden.",
            },
          ],
        };
      }
    );
    server.tool(
      "Wettervorhersage",
      "Holen Sie sich die Wettervorhersage für eine bestimmte Stadt.",
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
                : `Entschuldigung, ich konnte das Wetter für ${city} nicht abrufen.`,
            },
          ],
        };
      }
    );

    server.prompt(
      "klassenfahrtPlanen",
      "Hilf Lehrkräften, eine passende Klassenfahrt zu planen und gib auch das Wetter für die Orte an.",
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
              text: `Hallo, ich möchte eine Klassenfahrt für Jugendliche in Deutschland organisieren: ${classSize} Jugendliche aus ${departure}, maximal ${maxTravelTime} Stunden Fahrtzeit, Budget ${budget} € pro Person, Reisedatum ist der ${date}. Bitte gib mir außerdem die aktuelle Temperatur in den passenden Städten.`,
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
          description: "Erhalten Sie gefilterte Vorschläge für Klassenfahrten",
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
