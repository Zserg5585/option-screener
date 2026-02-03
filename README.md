# option-screener (backend)

Small Node.js / Express backend for an Option Screener project.

## What it does
- Runs an HTTP API (Express)
- Public health endpoint
- Protected endpoints via `x-api-key`
- Fetches Binance Futures public data (time / exchangeInfo)
- Basic safety: input validation, error handling
- Can be run via PM2

## API

### Public
- GET /health

### Protected (x-api-key)
- GET /binance-time
- GET /exchange-info

## Requirements
- Node.js 20+
- npm

## Setup
Create `.env` (DO NOT commit it):

PORT=8080  
API_KEY=change_me_to_long_random_string

Install and run:
npm install  
npm start
