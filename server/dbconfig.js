const pgp = require('pg-promise')();

const dbConfig = {
  // Your database configuration options here
  // For example:
  host: 'localhost',
  port: 5432,
  database: 'your_database_name',
  user: 'your_username',
  password: 'your_password',
};
const db = pgp(dbConfig);

// Create the database table (assuming it doesn't exist yet)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS balance_sheets (
    id SERIAL PRIMARY KEY,
    business_name TEXT NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    profit_or_loss NUMERIC NOT NULL,
    assets_value NUMERIC NOT NULL
  )
`;

db.none(createTableQuery)
  .then(() => {
    console.log('Table "balance_sheets" created successfully');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });
