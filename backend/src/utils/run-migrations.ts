import dotenv from "dotenv";
dotenv.config();

import sequelize from "../config/database";
import { runMigrations, runSeeders } from "./migrate";
import createDatabaseIfNotExists from "./create-database";

const main = async () => {
  try {
    console.log("🚀 Starting migration process...\n");

    // Create database if not exists
    await createDatabaseIfNotExists();
    console.log("");

    await sequelize.authenticate();
    console.log("✅ Database connection established\n");

    await runMigrations();

    if (process.argv.includes("--seed")) {
      console.log("\n🌱 Starting seeding process...");
      await runSeeders();
    }

    await sequelize.close();
    console.log("\n✅ Migration process completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Error:", error.message || error);
    if (error.stack) {
      console.error(error.stack);
    }
    await sequelize.close().catch(() => {});
    process.exit(1);
  }
};

main();
