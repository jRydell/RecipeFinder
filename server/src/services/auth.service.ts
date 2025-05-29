import * as userQueries from "../queries/user.queries";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const authService = {
  async register(username: string, email: string, password: string) {
    try {
      // Basic validation
      if (!username || !email || !password) {
        return { error: "All fields are required", status: 400 };
      }

      // Check if email already exists
      const existingUser = await userQueries.getUserByEmail(email);
      if (existingUser) {
        return { error: "User with this email already exists", status: 409 };
      }

      // Create user
      const userId = await userQueries.createUser({
        username,
        email,
        password,
      });

      // Generate JWT token
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

  async login(email: string, password: string) {
    try {
      // Basic validation
      if (!email || !password) {
        return { error: "Email and password are required", status: 400 };
      }

      // Get user by email
      const user = await userQueries.getUserByEmail(email);
      if (!user) {
        return { error: "Invalid credentials", status: 401 };
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { error: "Invalid credentials", status: 401 };
      }

      // Generate JWT token
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
