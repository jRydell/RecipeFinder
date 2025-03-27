import connection from "../db";
import { User, UserRegistrationDTO } from "../types/user.types";
import bcrypt from "bcryptjs";

export async function createUser(user: UserRegistrationDTO): Promise<number> {
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Insert user with hashed password
  const [result] = await connection.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, hashedPassword]
  );

  return (result as any).insertId;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
}

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await connection.query(
    "SELECT id, username, email, created_at FROM users WHERE id = ?", // Exclude password
    [id]
  );

  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
}
