Dies ist ein [Next.js](https://nextjs.org) Projekt, das mit [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) gestartet wurde.

## Einrichtungshinweise

1. Erstelle ein Konto bei [OpenRouteService](https://openrouteservice.org/).

2. Gehe zu [https://account.heigit.org/manage/key](https://account.heigit.org/manage/key) und hole dir deinen API-Schluessel.

3. Erstelle im Hauptverzeichnis deines Projekts eine `.env`-Datei und fuege deinen API_KEY wie folgt hinzu:

   ```env
   NEXT_PUBLIC_ORS_API_KEY="dein_api_key"
   ```

4. Dependencies installieren

   ```bash
   npm install
   ```

5. Starte den Server:

   ```bash
   npm run dev
   ```

6. Falls du Claude Desktop noch nicht hast, lade es [hier](https://claude.ai/download) herunter.

7. Nutze die Dokumentation unter [Model Context Protocol Quickstart](https://modelcontextprotocol.io/quickstart/user), um auf die Claude-Konfigurationsdatei zuzugreifen.

8. Fuege diese Konfiguration in deine Claude-Konfigurationsdatei ein:

   ```json
   {
     "mcpServers": {
       "mcp-server": {
         "command": "npx",
         "args": ["-y", "mcp-remote", "http://localhost:3000/mcp"]
       }
     }
   }
   ```

9. Probiere nun in Claude Desktop folgenden Prompt aus:

   ```text
   Hallo, ich moechte eine Klassenfahrt fuer Jugendliche in Deutschland organisieren: 20 Jugendliche aus Berlin, maximal 4 Stunden Fahrtzeit, Budget 100 € pro Person, Reisedatum ist der 20.08.2025. Bitte gib mir außerdem die aktuelle Temperatur in den passenden Staedten.
   ```
