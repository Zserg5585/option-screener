'use strict';

const express = require('express');

function publicRouter() {
  const r = express.Router();

  r.get('/', (_req, res) => res.json({ ok: true, name: 'options-backend' }));
  r.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

  return r;
}

module.exports = { publicRouter };
