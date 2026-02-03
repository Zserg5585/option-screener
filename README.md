# Option Screener Backend

Backend API for crypto options / futures screening.

## Stack
- Node.js
- Express
- PM2
- Binance API

## API

### Public
- GET /health

### Protected (x-api-key)
- GET /binance-time
- GET /exchange-info

## Auth
All protected endpoints require header:

x-api-key: YOUR_API_KEY

## Run
node index.js

## Process manager
pm2 start index.js --name options-backend
