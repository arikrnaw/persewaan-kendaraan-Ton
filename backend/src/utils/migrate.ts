import sequelize from "../config/database";
import { QueryInterface } from "sequelize";
import * as fs from "fs";
import * as path from "path";

const queryInterface: QueryInterface = sequelize.getQueryInterface();

// Helper untuk menjalankan migrasi
export const runMigrations = async (): Promise<void> => {
  try {
    // Create migrations table if not exists
    const [results] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'SequelizeMeta'
    `);

    const count = (results as Array<{ count: number }>)[0]?.count || 0;

    if (count === 0) {
      await queryInterface.createTable("SequelizeMeta", {
        name: {
          type:
            sequelize.constructor.name === "Sequelize"
              ? "STRING"
              : "VARCHAR(255)",
          allowNull: false,
          primaryKey: true,
        },
      });
    }

    // Get executed migrations
    const [executedMigrations] = await sequelize.query(
      "SELECT name FROM SequelizeMeta"
    );
    const executedNames = (executedMigrations as Array<{ name: string }>).map(
      (m) => m.name
    );

    // Get all migration files
    const migrationsPath = path.join(__dirname, "../migrations");
    const files = fs
      .readdirSync(migrationsPath)
      .filter(
        (file) =>
          file.endsWith(".ts") && file !== "004-create-migrations-table.ts"
      )
      .sort();

    // Run pending migrations
    for (const file of files) {
      const migrationName = file.replace(".ts", "");
      if (!executedNames.includes(migrationName)) {
        console.log(`Running migration: ${migrationName}`);
        const migration = await import(path.join(migrationsPath, file));
        await migration.up(queryInterface);
        await sequelize.query(
          `INSERT INTO SequelizeMeta (name) VALUES ('${migrationName}')`
        );
        console.log(`✅ Migration ${migrationName} completed`);
      }
    }

    console.log("✅ All migrations completed");
  } catch (error) {
    console.error("❌ Migration error:", error);
    throw error;
  }
};

// Helper untuk menjalankan seeders
export const runSeeders = async (): Promise<void> => {
  try {
    const seedersPath = path.join(__dirname, "../seeders");
    const files = fs
      .readdirSync(seedersPath)
      .filter((file) => file.endsWith(".ts"))
      .sort();

    for (const file of files) {
      console.log(`Running seeder: ${file}`);
      const seeder = await import(path.join(seedersPath, file));
      await seeder.up(queryInterface);
      console.log(`✅ Seeder ${file} completed`);
    }

    console.log("✅ All seeders completed");
  } catch (error) {
    console.error("❌ Seeder error:", error);
    throw error;
  }
};
