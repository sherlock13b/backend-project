const { Pool } = require('pg');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
require('dotenv').config();

let pool;

async function initPool() {
  const client = new SecretsManagerClient({ region: 'ap-south-2' });
  const command = new GetSecretValueCommand({ SecretId: 'notes-app-db-password' });
  const response = await client.send(command);
  const password = response.SecretString;

  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: password,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

module.exports = { initPool, getPool: () => pool };