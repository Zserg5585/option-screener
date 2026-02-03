'use strict';

require('dotenv').config({ quiet: true });

const { env } = require('./config/env');
const { createApp } = require('./app');

function startServer() {
  const app = createApp();

  app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`Backend started on http://0.0.0.0:${env.PORT}`);
  });
}

module.exports = { startServer };
