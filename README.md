# Fun Joke Generator – Comic Edition

## Overview

Single-page app that shows random jokes with a comic-style layout, a small weather widget, and **live translation**.

**Live translation languages:** Spanish (ES) and French (FR).

**Live demo:** https://it-springs.crbarrio.es/assets/demos/spring4/

## Requirements

- Node.js + npm
- **Docker (required for the translation feature)**

The live translation runs through a backend service started via Docker Compose (see `backend/docker-compose.yml`).

## Getting started

```bash
# install dependencies
npm install

# start everything (translation backend via Docker + Vite dev server)
npm run dev

# start only frontend (Vite server)
npm run vite
```

### First run note (model download)

On the **first startup**, the translation backend may need extra time to download language models. This can take a few minutes depending on your connection and machine.

- Keep `npm run dev` running.
- Wait until Docker logs indicate the service is ready.
- The Vite dev server will start after the backend is reachable (the script waits for `http://localhost:5000`).

To stop containers later:

```bash
npm run docker:down
```

You can also press **Ctrl + C** in the terminal running `npm run dev` to stop the dev processes and stop the Docker Compose containers started for the translation backend.

## Tech Stack

- Vite + TypeScript
- Tailwind-style utility classes (compiled CSS in `src/css/style.css`)
- Vitest for unit tests
- Docker Compose backend for live translation

## Project structure (overview)

- `index.html` – main page and root markup
- `src/ts/main.ts` – app entry point and event listeners
- `src/ts/services/jokeManager.ts` – joke fetching and score handling
- `src/ts/services/weatherManager.ts` – weather fetching and rendering
- `src/ts/services/languageManager.ts` – language selection / translation flow
- `src/ts/api/config.ts` – API endpoints config, env-driven options
- `src/ts/api/apiService.ts` – generic fetch helper using the config
- `src/ts/ui/ui.ts` – UI helpers (spinner, score popup, panel reset, etc.)
- `src/ts/utils/dom.ts` – small DOM utility helpers
- `tests/apiService.test.ts` – sample unit tests

With Docker running and the `.env`/`.env.local` configured, `npm run dev` should give you jokes, ratings, weather data, and live translation end to end.

## Environment configuration

This project uses Vite, so only variables prefixed with `VITE_` are exposed to the client.

For **exercise correction purposes**, the repository includes a `.env` file at the project root. In that file you should paste your Visual Crossing token into the `VITE_WEATHER_API_KEY` variable so that the weather widget works during the review.

For real-world usage, avoid committing credentials and instead create a `.env.local` file (same level as `package.json`) with for example:

```bash
VITE_WEATHER_API_KEY=your_visual_crossing_api_key_here
VITE_DEBUG=true
```

Vite will also load `.env` if it exists, but you should avoid committing real keys to version control.

## Debug flag

The `VITE_DEBUG` flag controls whether certain errors are logged to the console.

In `src/ts/api/config.ts`:

```ts
export const debug = import.meta.env.VITE_DEBUG
```

And for example in `src/ts/services/weatherManager.ts`:

```ts
if (debug) console.log(apiResult.error)
```

Recommended values:

- `VITE_DEBUG=true` during development to see network and API issues in the console.
- Omit it or set `VITE_DEBUG=false` in production builds to avoid noisy logs.

## Weather API key

Weather data is fetched from Visual Crossing. The configuration lives in `src/ts/api/config.ts`:

```ts
url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{{latitude}}%2C{{longitude}}/today?unitGroup=metric&elements=conditions,icon,name,tempmax,tempmin&key={{api_key}}&contentType=json",
apiKey: import.meta.env.VITE_WEATHER_API_KEY,
```

- Sign up at Visual Crossing and generate an API key.
- Place that key in `VITE_WEATHER_API_KEY`.
- On startup, the app will request geolocation, call the weather endpoint and render icon + max/min temperatures.

If the key is missing or invalid, the weather call will fail; the joke features still work.

## Joke APIs

The app fetches jokes from **two public APIs** configured in `src/ts/api/config.ts`:

- Dad jokes from icanhazdadjoke: https://icanhazdadjoke.com/
- Chuck Norris jokes from Chuck Norris Jokes API: https://api.chucknorris.io/

On each request, one of these two sources is chosen at random and the joke text field is mapped according to the configuration.

## Scripts

```bash
# install dependencies
npm install

# start dev environment (Docker backend + Vite)
npm run dev

# build for production
npm run build

# preview production build
npm run preview

# run tests
npm test

# start/stop only the Docker backend
npm run docker:up
npm run docker:down
```