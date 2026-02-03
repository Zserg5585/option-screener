# Project Structure (backend)

This document describes the folder and file structure of the backend.

## Root

- index.js  
  Entry point. Loads env, starts the server.

- package.json  
  Project metadata and scripts.

- README.md  
  Project overview and setup instructions.

- API.md  
  API contract and endpoints documentation.

- STRUCTURE.md  
  This file. Explains project layout.

## src/

Main application source code.

- src/server.js  
  Creates and starts Express app.

- src/app.js  
  Express app configuration (middlewares, routes).

- src/routes/  
  HTTP routes.

  - health.js  
    Public `/health` endpoint.

  - binance.js  
    Protected Binance-related endpoints.

- src/middleware/
  - apiKey.js  
    `x-api-key` authentication middleware.

## Other

- .env  
  Environment variables (NOT committed).

- node_modules/  
  Dependencies (NOT committed).
