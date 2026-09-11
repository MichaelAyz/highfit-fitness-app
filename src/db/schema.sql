-- Database Schema for AI Fitness Application
-- Compatible with PostgreSQL and SQLite

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) DEFAULT 'placeholder_hash',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  age INTEGER,
  weight NUMERIC,
  height NUMERIC,
  stress_level VARCHAR(32),
  equipment_access TEXT, -- JSONB in PostgreSQL, TEXT in SQLite
  goals TEXT,            -- JSONB in PostgreSQL, TEXT in SQLite
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE,
  structure_json TEXT NOT NULL, -- JSONB in PostgreSQL, TEXT in SQLite
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
