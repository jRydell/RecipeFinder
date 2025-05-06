import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection, { testConnection } from "./db";
import authRoutes from "./routes/auth.routes";
import savedRecipeRoutes from "./routes/savedRecipe.routes";
import ratingRoutes from "./routes/rating.routes";
import commentRoutes from "./routes/comment.routes";
import { setupLogging } from "./middleware/logging";
import { healthRoutes } from "./routes/health.routes";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

// Create server
const app = express();
const port = parseInt(process.env.PORT || "3000");
const server = createServer(app);
const serverStartTime = new Date();

// Middleware
setupLogging(app, serverStartTime);
app.use(express.json());
app.use(cors());

// Routes
app.use("/", healthRoutes(serverStartTime));
app.use("/api/auth", authRoutes);
app.use("/api/saved-recipes", savedRecipeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/comments", commentRoutes);

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

/* async function startServer() {
  server.listen(port, "127.0.0.1", async () => {
    console.log(`Server is running on port ${port}`);
    try {
      await connection.query("SELECT 1");
      console.log("Connected to MySQL database");
    } catch (error) {
      console.error("Unable to connect to MySQL database:", error);
    }
  });
} */

startServer();
