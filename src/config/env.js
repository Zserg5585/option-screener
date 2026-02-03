'use strict';

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function num(name, def) {
  const v = process.env[name];
  if (!v) return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Env var ${name} must be a number`);
  return n;
}

const env = {
  PORT: num('PORT', 8080),
  API_KEY: must('API_KEY'),
  BINANCE_BASE_URL: process.env.BINANCE_BASE_URL || 'https://fapi.binance.com',
  NODE_ENV: process.env.NODE_ENV || 'production',
};

module.exports = { env };
