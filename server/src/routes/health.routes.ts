import { Router, Request, Response } from "express";
import { testConnection } from "../db";
import connection from "../db";

export function healthRoutes(serverStartTime: Date) {
  const router = Router();

  // Server health endpoint
  router.get("/health", (req: Request, res: Response) => {
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

  // Database health endpoint
  router.get("/health/db", async (req: Request, res: Response) => {
    const result = await testConnection();
    if (result) {
      res.json({ status: "connected", time: new Date().toISOString() });
    } else {
      res.status(500).json({ status: "disconnected" });
    }
  });

  return router;
}
