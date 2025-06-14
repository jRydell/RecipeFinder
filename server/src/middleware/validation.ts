import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Log technical info for debugging
        console.error(`Validation failed on ${req.method} ${req.path}:`, {
          body: req.body,
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });

        //user-friendly error message
        const errorMessage = error.errors.map((e) => e.message).join(", ");

        return res.status(400).json({
          message: errorMessage,
        });
      }
    }
  };
};
