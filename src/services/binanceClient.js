'use strict';

const { env } = require('../config/env');
const { getJson } = require('../utils/http');

/**
 * Binance API client (fapi).
 * All calls return normalized object:
 *  { ok, status, data, message? }
 */

function buildUrl(path) {
  // Ensure single slash
  const base = String(env.BINANCE_BASE_URL || '').replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  return `${base}/${p}`;
}

async function ping() {
  return getJson(buildUrl('/fapi/v1/ping'));
}

async function time() {
  return getJson(buildUrl('/fapi/v1/time'));
}

async function exchangeInfo() {
  return getJson(buildUrl('/fapi/v1/exchangeInfo'));
}

/**
 * Options chain / option info (this depends on your previous working endpoint).
 * IMPORTANT: keep path exactly as your current backend uses.
 * If later we confirm the real Binance endpoint differs, we'll adjust here only.
 */
async function optionsChain({ asset, days, debug } = {}) {
  const params = {};
  if (asset) params.asset = asset;
  if (days != null) params.days = days;
  if (debug != null) params.debug = debug ? 1 : 0;

  // Your backend previously used "/chain" route itself.
  // Here we keep ONLY Binance calls, so for now we DON'T implement it.
  // We'll implement real chain later, after routes are split.
  return { ok: false, status: 501, data: null, message: 'optionsChain not wired yet' };
}

module.exports = {
  ping,
  time,
  exchangeInfo,
  optionsChain,
};
