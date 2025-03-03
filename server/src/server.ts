import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection from "./db";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "5000"); // Add default port if not specified
const server = createServer(app);
const serverStartTime = new Date();

app.use(express.json());
app.use(cors());

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query("SELECT 1 + 1 AS solution");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: "connected", // Assuming DB is connected if server is running
  });
});

// Keep original root endpoint as is for direct server access
app.get("/", (req: Request, res: Response) => {
  const uptime = new Date().getTime() - serverStartTime.getTime();

  // Calculate time components
  const seconds = Math.floor(uptime / 1000) % 60;
  const minutes = Math.floor(uptime / (1000 * 60)) % 60;
  const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  // Format the output as plain text
  const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  const statusText = `Server Status: Running
Server started at: ${serverStartTime.toISOString()}
Uptime: ${formattedUptime}`;

  // Set the content type to plain text and send the response
  res.setHeader("Content-Type", "text/plain");
  res.send(statusText);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Change the listen line at the bottom of the file
server.listen(port, "0.0.0.0", async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await connection.query("SELECT 1");
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
  }
});
