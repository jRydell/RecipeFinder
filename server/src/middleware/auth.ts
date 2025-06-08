// Authentication middleware for Express routes.
// Verifies JWT tokens and attaches user info to the request object if valid.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user info after authentication
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

/**
 * Middleware to authenticate JWT tokens in the Authorization header.
 * - Expects header format: 'Authorization: Bearer <token>'
 * - If valid, attaches user info to req.user and calls next()
 * - If missing or invalid, responds with 401 or 403
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    // No token provided
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      // Token invalid or expired
      return res.status(403).json({ message: "Forbidden" });
    }
    // Attach user info to request for downstream handlers
    req.user = user;
    next();
  });
};
