# Option Screener API

Base URL:
http://<HOST>:8080

---

## Authentication

Protected endpoints require header:

x-api-key: <API_KEY>

If the header is missing or invalid, server returns **401 Unauthorized**.

---

## Public Endpoints

### GET /health

Health check endpoint.

**Headers:** none

**Response 200**
```json
{
  "ok": true
}
