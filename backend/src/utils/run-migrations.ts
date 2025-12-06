import dotenv from "dotenv";
dotenv.config();

import sequelize from "../config/database";
import { runMigrations, runSeeders } from "./migrate";

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    await runMigrations();

    if (process.argv.includes("--seed")) {
      await runSeeders();
    }

    await sequelize.close();
    console.log("✅ Migration process completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

main();
