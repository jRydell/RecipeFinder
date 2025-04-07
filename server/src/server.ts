import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection from "./db";
import authRoutes from "./routes/auth.routes";
import savedRecipeRoutes from "./routes/savedRecipe.routes";
import ratingRoutes from "./routes/rating.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000");
const server = createServer(app);
const serverStartTime = new Date();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/saved-recipes", savedRecipeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/comments", commentRoutes);

app.get("/api/test-db", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query("SELECT 1 + 1 AS solution");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

app.get("/api/", (req: Request, res: Response) => {
  const uptime = new Date().getTime() - serverStartTime.getTime();
  const seconds = Math.floor(uptime / 1000) % 60;
  const minutes = Math.floor(uptime / (1000 * 60)) % 60;
  const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  const statusText = `Server Status: Running
Server started at: ${serverStartTime.toISOString()}
Uptime: ${formattedUptime}`;

  res.setHeader("Content-Type", "text/plain");
  res.send(statusText);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(port, "127.0.0.1", async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await connection.query("SELECT 1");
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
  }
});
