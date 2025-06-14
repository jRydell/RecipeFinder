import { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * validation middleware for request data using Zod schemas.
 * Can validate request body, URL parameters, or query parameters.
 * @param schema - Zod schema to validate against
 * @param target - Which part of the request to validate ('body' | 'params' | 'query')
 *
 */

export const validate = (
  schema: z.ZodSchema,
  target: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[target]; // req.body, req.params, or req.query

    try {
      schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        //debugging
        console.error(`Validation failed on ${req.method} ${req.path}:`, {
          [target]: dataToValidate,
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
