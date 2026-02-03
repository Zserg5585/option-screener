'use strict';

const axios = require('axios');

/**
 * Minimal axios wrapper:
 * - timeout
 * - consistent error messages
 * - returns JSON data
 */

function normalizeError(err) {
  // Axios timeout
  if (err && err.code === 'ECONNABORTED') {
    return new Error('Upstream timeout');
  }

  // Axios response error
  if (err && err.response) {
    const status = err.response.status;
    const statusText = err.response.statusText || '';
    const body = err.response.data;

    let bodyPreview = '';
    try {
      bodyPreview =
        typeof body === 'string'
          ? body.slice(0, 200)
          : JSON.stringify(body).slice(0, 200);
    } catch (_) {
      bodyPreview = '';
    }

    return new Error(
      `Upstream error ${status} ${statusText}`.trim() +
        (bodyPreview ? `: ${bodyPreview}` : '')
    );
  }

  // Axios request error (no response)
  if (err && err.request) {
    return new Error('Upstream unreachable');
  }

  // Fallback
  return new Error((err && err.message) || 'Unknown error');
}

async function getJson(url, opts) {
  const timeoutMs =
    (opts && Number.isFinite(opts.timeoutMs) && opts.timeoutMs) || 10000;

  try {
    const r = await axios.get(url, {
      timeout: timeoutMs,
      headers: (opts && opts.headers) || {},
      validateStatus: () => true, // we handle status manually
    });

    if (r.status < 200 || r.status >= 300) {
      const e = new Error('Upstream non-2xx');
      e.response = r;
      throw e;
    }

    return r.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

module.exports = { getJson };
