'use strict';

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { publicRouter } = require('./routes/public');
const { binanceRouter } = require('./routes/binance');

function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(cors());
  app.use(express.json({ limit: '256kb' }));

  app.use(
    rateLimit({
      windowMs: 60_000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Routes
  app.use('/', publicRouter());
  app.use('/', binanceRouter());

  // 404
  app.use((req, res) => {
    res.status(404).json({ ok: false, error: 'not_found' });
  });

  return app;
}

module.exports = { createApp };
