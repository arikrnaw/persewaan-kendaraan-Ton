import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const createDatabaseIfNotExists = async (): Promise<void> => {
  const dbName = process.env.DB_NAME || "vehicle_rental";
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = parseInt(process.env.DB_PORT || "3306");
  const dbUser = process.env.DB_USER || "root";
  const dbPassword = process.env.DB_PASSWORD || "";

  try {
    // Connect tanpa database (untuk membuat database)
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });

    console.log(`🔍 Checking if database '${dbName}' exists...`);

    // Cek apakah database sudah ada
    const [databases] = await connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [dbName]
    );

    const dbExists = (databases as Array<{ SCHEMA_NAME: string }>).length > 0;

    if (dbExists) {
      console.log(`✅ Database '${dbName}' already exists`);
    } else {
      console.log(`📦 Creating database '${dbName}'...`);
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
      console.log(`✅ Database '${dbName}' created successfully`);
    }

    await connection.end();
  } catch (error: any) {
    console.error(`❌ Error creating database:`, error.message);
    throw error;
  }
};

// Jika dijalankan langsung
if (require.main === module) {
  createDatabaseIfNotExists()
    .then(() => {
      console.log("\n✅ Database setup completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Database setup failed:", error);
      process.exit(1);
    });
}

export default createDatabaseIfNotExists;
