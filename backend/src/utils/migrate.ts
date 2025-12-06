import sequelize from "../config/database";
import { QueryInterface, DataTypes } from "sequelize";
import * as fs from "fs";
import * as path from "path";

const queryInterface: QueryInterface = sequelize.getQueryInterface();

// Helper untuk resolve path dengan benar
const resolvePath = (filePath: string): string => {
  return path.resolve(__dirname, filePath);
};

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
          type: DataTypes.STRING(255),
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
    const migrationsPath = path.resolve(__dirname, "../migrations");
    const files = fs
      .readdirSync(migrationsPath)
      .filter(
        (file) =>
          file.endsWith(".ts") && file !== "004-create-migrations-table.ts"
      )
      .sort();

    if (files.length === 0) {
      console.log("⚠️  No migration files found");
      return;
    }

    console.log(`Found ${files.length} migration file(s)`);

    // Run pending migrations
    for (const file of files) {
      const migrationName = file.replace(".ts", "");
      if (!executedNames.includes(migrationName)) {
        console.log(`\n🔄 Running migration: ${migrationName}`);
        try {
          // Use require for dynamic import in Node.js
          const migrationPath = path.resolve(migrationsPath, file);
          delete require.cache[require.resolve(migrationPath)];
          const migration = require(migrationPath);

          if (!migration.up) {
            throw new Error(
              `Migration ${migrationName} does not export 'up' function`
            );
          }

          await migration.up(queryInterface);
          await sequelize.query(
            `INSERT INTO SequelizeMeta (name) VALUES ('${migrationName}')`
          );
          console.log(`✅ Migration ${migrationName} completed`);
        } catch (error: any) {
          console.error(
            `❌ Error running migration ${migrationName}:`,
            error.message
          );
          throw error;
        }
      } else {
        console.log(`⏭️  Migration ${migrationName} already executed`);
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
    const seedersPath = path.resolve(__dirname, "../seeders");
    const files = fs
      .readdirSync(seedersPath)
      .filter((file) => file.endsWith(".ts"))
      .sort();

    if (files.length === 0) {
      console.log("⚠️  No seeder files found");
      return;
    }

    console.log(`\nFound ${files.length} seeder file(s)`);

    for (const file of files) {
      console.log(`\n🔄 Running seeder: ${file}`);
      try {
        // Use require for dynamic import in Node.js
        const seederPath = path.resolve(seedersPath, file);
        delete require.cache[require.resolve(seederPath)];
        const seeder = require(seederPath);

        if (!seeder.up) {
          throw new Error(`Seeder ${file} does not export 'up' function`);
        }

        await seeder.up(queryInterface);
        console.log(`✅ Seeder ${file} completed`);
      } catch (error: any) {
        console.error(`❌ Error running seeder ${file}:`, error.message);
        throw error;
      }
    }

    console.log("\n✅ All seeders completed");
  } catch (error) {
    console.error("❌ Seeder error:", error);
    throw error;
  }
};
