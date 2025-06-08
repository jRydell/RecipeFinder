// User queries: handles database operations related to users (creation, lookup by email/id)
// Uses MySQL connection and bcrypt for password hashing

import connection from "../db";
import { User, UserRegistrationDTO } from "../types/user.types";
import bcrypt from "bcryptjs";

/**
 * Creates a new user in the database.
 * - Hashes the password before storing
 * - Returns the new user's ID
 * @param user UserRegistrationDTO (username, email, password)
 * @returns number (inserted user ID)
 */
export async function createUser(user: UserRegistrationDTO): Promise<number> {
  // Hash the password for security
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Insert user with hashed password
  const [result] = await connection.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, hashedPassword]
  );

  return (result as any).insertId;
}

/**
 * Finds a user by email address.
 * - Returns the first user found or null if not found
 * @param email string
 * @returns User object or null
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
}
