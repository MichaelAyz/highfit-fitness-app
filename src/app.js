/**
 * @file app.js
 * Express Application configuration with CORS, JSON body parser, routes, and global error handling.
 */

import express from 'express';
import cors from 'cors';
import fitnessRoutes from './routes/fitnessRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1', fitnessRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Application Error]:', err.message || err);

  const status = err.status || 500;
  res.status(status).json({
    error: err.name || 'ApplicationError',
    message: err.message || 'An unexpected internal server error occurred',
    details: err.details || null
  });
});

export default app;
