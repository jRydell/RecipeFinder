import { Request, Response, NextFunction, Application } from "express";

export const logging = (app: Application, serverStartTime: Date) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);

    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const responseTimestamp = new Date().toISOString();

      // output for errors
      if (res.statusCode >= 400) {
        console.error(
          `[${responseTimestamp}] ERROR ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`
        );
      } else {
        console.log(
          `[${responseTimestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`
        );
      }
    });
    next();
  });
};
