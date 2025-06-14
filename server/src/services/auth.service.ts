// Authentication service: handles user registration and login, including password hashing and JWT token generation.
// Uses userQueries for database operations.

import * as userQueries from "../queries/user.queries";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const authService = {
  /**
   * Registers a new user.
   * - Checks if email already exists
   * - Creates user (password will be hashed in userQueries)
   * - Generates JWT token for the new user
   * @param username string
   * @param email string
   * @param password string
   * @returns Success: user info + token; Error: error message and status
   */
  async register(username: string, email: string, password: string) {
    try {
      // Check if user already exists by email
      const existingUser = await userQueries.getUserByEmail(email);
      if (existingUser) {
        return { error: "User with this email already exists", status: 409 };
      }

      // Create user in DB (password will be hashed in userQueries)
      const userId = await userQueries.createUser({
        username,
        email,
        password,
      });

      // Generate JWT token for the new user
      const token = jwt.sign({ id: userId, username }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return {
        data: {
          message: "User registered successfully",
          token,
          user: {
            id: userId,
            username,
            email,
          },
        },
        status: 201,
      };
    } catch (error) {
      console.error("Error during registration:", error);
      return { error: "Registration failed", status: 500 };
    }
  },

  /**
   * Logs in a user.
   * - Looks up user by email
   * - Compares password with hashed password in DB
   * - Generates JWT token if credentials are valid
   * @param email string
   * @param password string
   * @returns Success: user info + token; Error: error message and status
   */
  async login(email: string, password: string) {
    try {
      // Find user by email
      const user = await userQueries.getUserByEmail(email);
      if (!user) {
        return { error: "Invalid credentials", status: 401 };
      }

      // Compare provided password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { error: "Invalid credentials", status: 401 };
      }

      // Generate JWT token for the user
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        data: {
          message: "Login successful",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        },
        status: 200,
      };
    } catch (error) {
      console.error("Error during login:", error);
      return { error: "Login failed", status: 500 };
    }
  },
};
