CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Will store hashed passwords
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved recipes table
CREATE TABLE saved_recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meal_id VARCHAR(50) NOT NULL, -- MealDB ID
  meal_name VARCHAR(255) NOT NULL,
  meal_thumb VARCHAR(255),
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_meal (user_id, meal_id) -- Prevent duplicate saves
);

-- Ratings table
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meal_id VARCHAR(50) NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_rating (user_id, meal_id) -- One rating per user per recipe
);

-- Comments table
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meal_id VARCHAR(50) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);