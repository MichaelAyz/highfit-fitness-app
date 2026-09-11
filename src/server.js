/**
 * @file server.js
 * Server startup script listening on specified PORT.
 */

import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`[AuraFit AI Engine] Server listening on http://localhost:${PORT}`);
});

export default server;
