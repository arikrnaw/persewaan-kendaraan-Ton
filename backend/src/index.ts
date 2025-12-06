import dotenv from "dotenv";

// Load environment variables dari .env file
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import TransactionHeader from "./models/TransactionHeader";
import TransactionDetail from "./models/TransactionDetail";
import MsCategory from "./models/MsCategory";
import "./models/associations"; // Import associations untuk mendefinisikan relasi
import transactionRoutes from "./routes/transactionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import numbersRoutes from "./routes/numbersRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/numbers", numbersRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Vehicle Rental Transaction API",
    version: "1.0.0",
  });
});

// Initialize database dan start server
const startServer = async () => {
  try {
    // Connect ke database
    await connectDB();

    // Run migrations (jika ada)
    if (process.env.RUN_MIGRATIONS === "true") {
      const { runMigrations, runSeeders } = await import("./utils/migrate");
      await runMigrations();
      if (process.env.RUN_SEEDERS === "true") {
        await runSeeders();
      }
    } else {
      // Sync models dengan database (untuk development - fallback)
      // Hapus { force: true } di production untuk menghindari drop table
      if (process.env.NODE_ENV === "development") {
        await MsCategory.sync({ alter: true });
        await TransactionHeader.sync({ alter: true });
        await TransactionDetail.sync({ alter: true });
        console.log("✅ Database models synchronized");
      }
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(
        `📝 API endpoints available at http://localhost:${PORT}/api/transactions`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
