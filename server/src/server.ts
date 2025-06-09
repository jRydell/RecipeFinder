import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection, { testConnection } from "./db";
import authRoutes from "./routes/auth.routes";
import savedRecipeRoutes from "./routes/saved.recipe.routes";
import reviewRoutes from "./routes/review.routes";
import { setupLogging } from "./middleware/logging";
import { healthRoutes } from "./routes/health.routes";
import { errorHandler } from "./middleware/error.handler";

// Load environment variables
dotenv.config();

// Create server
const app = express();
if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined.");
}
const port = parseInt(process.env.PORT);
const server = createServer(app);
const serverStartTime = new Date();

// Middleware
setupLogging(app, serverStartTime);
app.use(express.json());

// CORS - Only for DEV
const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
    })
  );
  console.log("CORS enabled for development");
} else {
  console.log("CORS disabled for production (handled by nginx)");
}

// Routes
app.use("/", healthRoutes(serverStartTime));
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/my-recipes", savedRecipeRoutes);
// Error handling
app.use(errorHandler);

// Start server
async function startServer() {
  server.listen(port, "127.0.0.1", async () => {
    console.log(`Server is running on port ${port}`);

    const dbConnected = await testConnection();
    if (dbConnected) {
      console.log("Connected to MySQL database");
    } else {
      console.error("Unable to connect to MySQL database");
    }
  });
}

startServer();
