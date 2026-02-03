'use strict';

const express = require('express');
const { requireApiKey } = require('../middleware/requireApiKey');
const { getServerTime, getExchangeInfoSlim } = require('../services/binance');

function binanceRouter() {
  const r = express.Router();

  r.get('/binance-time', requireApiKey, async (_req, res) => {
    const data = await getServerTime();
    res.json({ ok: true, data });
  });

  r.get('/exchange-info', requireApiKey, async (_req, res) => {
    const data = await getExchangeInfoSlim();
    res.json({ ok: true, data });
  });

  return r;
}

module.exports = { binanceRouter };
