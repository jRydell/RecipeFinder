import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection, { testConnection } from "./db";
import authRoutes from "./routes/auth.routes";
import savedRecipeRoutes from "./routes/savedRecipe.routes";
import ratingRoutes from "./routes/rating.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000");
const server = createServer(app);
const serverStartTime = new Date();

//Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);

  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/saved-recipes", savedRecipeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/comments", commentRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(port, "127.0.0.1", async () => {
  console.log(`Server is running on port ${port}`);

  const isConnected = await testConnection();
  if (isConnected) {
    console.log("Successfully connected to MySQL database");
  } else {
    console.error("Failed to connect to database - check your configuration");
  }
});
