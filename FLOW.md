# Request Flow (Option Screener Backend)

This doc explains how an HTTP request goes through the backend.

## Big picture

Client -> Express -> middleware -> route handler -> (service/util) -> response

## Public endpoint: GET /health

1) Request comes to Express app (src/server.js -> src/app.js)
2) Router matches /health (src/routes/health.js)
3) Handler returns JSON:
   { "ok": true }

No auth header required.

## Protected endpoint example: GET /binance-time (x-api-key)

1) Request comes to Express app
2) Middleware `requireApiKey` runs first (src/middleware/requireApiKey.js)
   - reads header: x-api-key
   - compares with env.API_KEY
   - if missing/invalid -> 401 { ok:false, error:"unauthorized" }
3) If authorized, router matches /binance-time (src/routes/binance.js)
4) Route handler calls service (src/services/binanceService.js)
   - calls Binance Futures public API (env.BINANCE_BASE_URL)
5) Response returns JSON with data

## Files involved

- index.js
  Entry point. Loads .env and starts server.

- src/server.js
  Creates HTTP server and listens on PORT.

- src/app.js
  Express app setup (JSON, routes, error handling).

- src/middleware/requireApiKey.js
  Protects endpoints via `x-api-key`.

- src/routes/health.js
  Public health endpoint.

- src/routes/binance.js
  Protected Binance endpoints.

- src/services/binanceService.js
  Binance HTTP calls + caching/rate-limit logic (if enabled).
