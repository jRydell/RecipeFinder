// Controller for authentication endpoints: handles user registration and login requests.
// Delegates business logic to authService and sends appropriate HTTP responses.

import { Request, Response } from "express";
import { authService } from "../services/auth.service";

/**
 * POST /register
 * Handles user registration requests.
 * Expects: { username, email, password } in request body.
 * Responds with user info and JWT token on success, or error message on failure.
 */
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const result = await authService.register(username, email, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};

/**
 * POST /login
 * Handles user login requests.
 * Expects: { email, password } in request body.
 * Responds with user info and JWT token on success, or error message on failure.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(result.status).json(result.data);
};
