'use strict';

const { env } = require('../config/env');

function requireApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== env.API_KEY) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }
  return next();
}

module.exports = { requireApiKey };
