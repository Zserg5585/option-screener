'use strict';

const NodeCache = require('node-cache');

/**
 * Simple in-memory cache wrapper.
 * TTL is in seconds.
 */

const cache = new NodeCache({
  stdTTL: 30,
  checkperiod: 60,
  useClones: false,
});

function get(key) {
  return cache.get(key);
}

function set(key, value, ttlSec) {
  if (typeof ttlSec === 'number' && Number.isFinite(ttlSec) && ttlSec > 0) {
    cache.set(key, value, ttlSec);
    return true;
  }
  cache.set(key, value);
  return true;
}

function del(key) {
  return cache.del(key);
}

function flush() {
  cache.flushAll();
}

function stats() {
  return cache.getStats();
}

/**
 * Cache-aside helper:
 * - key: cache key
 * - ttlSec: number
 * - fn: async () => any
 */
async function getOrSet(key, ttlSec, fn) {
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  const val = await fn();
  set(key, val, ttlSec);
  return val;
}

module.exports = {
  get,
  set,
  del,
  flush,
  stats,
  getOrSet,
};
