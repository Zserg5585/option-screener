'use strict';

const { env } = require('../config/env');
const { getJson } = require('../utils/http');
const { getOrSet } = require('../utils/cache');

function url(path) {
  const base = String(env.BINANCE_BASE_URL || '').replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  return `${base}/${p}`;
}

// /fapi/v1/time
async function getServerTime() {
  // кэш короткий, просто чтобы не дергать лишний раз
  return getOrSet('binance:time', 3, async () => {
    const data = await getJson(url('/fapi/v1/time'), { timeoutMs: 8000 });
    return data;
  });
}

// /fapi/v1/exchangeInfo (сжимаем payload, чтобы не лить мегабайты)
async function getExchangeInfoSlim() {
  return getOrSet('binance:exchangeInfoSlim', 60, async () => {
    const data = await getJson(url('/fapi/v1/exchangeInfo'), { timeoutMs: 12000 });

    const symbols = Array.isArray(data.symbols) ? data.symbols : [];

    return {
      timezone: data.timezone,
      serverTime: data.serverTime,
      symbols: symbols.slice(0, 300).map((s) => ({
        symbol: s.symbol,
        baseAsset: s.baseAsset,
        quoteAsset: s.quoteAsset,
        marginAsset: s.marginAsset,
        contractType: s.contractType,
        underlyingType: s.underlyingType,
        status: s.status,
      })),
    };
  });
}

module.exports = {
  getServerTime,
  getExchangeInfoSlim,
};
