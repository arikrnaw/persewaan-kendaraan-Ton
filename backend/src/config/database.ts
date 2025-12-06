import { Sequelize } from "sequelize";

// Konfigurasi database MySQL
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "vehicle_rental",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

// Test koneksi database
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    return sequelize;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
