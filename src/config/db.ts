import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
export const db = mysql.createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'), // fixa till förväntad datatyp, parseInt gör om till ett nummer
});

export const connectToDatabase = async () => {
  try {
    await db.getConnection();
    console.log('Connected to database.');
  } catch (error: unknown) {
    console.log('Error connecting to database:' + error);
  }
};
