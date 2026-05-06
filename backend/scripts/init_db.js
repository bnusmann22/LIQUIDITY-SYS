import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { Client } = pg;

const dbName = process.env.DB_NAME || 'kpi_db';

// Connect to default 'postgres' database to create the new one if needed
const initClient = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: 'postgres',
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432', 10),
});

async function initDB() {
  try {
    await initClient.connect();
    
    // Check if database exists
    const res = await initClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    
    if (res.rowCount === 0) {
      console.log(`Database '${dbName}' does not exist. Creating...`);
      await initClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (err) {
    console.error('Error ensuring database exists:', err);
    process.exit(1);
  } finally {
    await initClient.end();
  }

  // Now connect to the actual database to create tables and seed
  const appClient = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: dbName,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432', 10),
  });

  try {
    await appClient.connect();

    // Create users table
    await appClient.query('DROP TABLE IF EXISTS users');
    await appClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'USER',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table ensured.');

    // Seed SUPER_ADMIN
    const username = 'SUPER_ADMIN';
    const password = 'P@ssw0rd123!_SecureLiquidity';
    
    const userRes = await appClient.query(`SELECT id FROM users WHERE username = $1`, [username]);
    
    if (userRes.rowCount === 0) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      await appClient.query(
        `INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)`,
        [username, hashedPassword, 'SUPER_ADMIN']
      );
      console.log(`Seeded user '${username}' successfully.`);
    } else {
      console.log(`User '${username}' already exists.`);
    }

  } catch (err) {
    console.error('Error setting up tables or seeding:', err);
  } finally {
    await appClient.end();
  }
}

initDB();
