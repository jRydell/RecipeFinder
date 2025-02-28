import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import connection from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT;
const server = createServer(app);

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

// Example route to test database connection
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query("SELECT 1 + 1 AS solution");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await connection.query("SELECT 1");
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
  }
});
