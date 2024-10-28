// config/db.js
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL Database:", err.message);
    return;
  }
  console.log("Connected to MySQL Database");

  // Create the users table if it doesn't exist
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      username VARCHAR(50) UNIQUE,
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      status ENUM('active', 'inactive') DEFAULT 'active',
      type ENUM('user', 'admin') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createUserTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating users table:", err.message);
      return;
    }
    console.log("Users table ready or already exists");

    // Insert an admin user if it doesn't exist
    const adminName = "Admin";
    const adminUsername = "admin";
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123"; // Change this password as needed
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);

    const insertAdminQuery = `
      INSERT INTO users (name, username, email, password, status, type)
      SELECT ?, ?, ?, ?, 'active', 'admin' FROM DUAL
      WHERE NOT EXISTS (
        SELECT 1 FROM users WHERE email = ?
      ) LIMIT 1;
    `;

    db.query(
      insertAdminQuery,
      [adminName, adminUsername, adminEmail, hashedPassword, adminEmail],
      (err, result) => {
        if (err) {
          console.error("Error inserting admin user:", err.message);
        } else if (result.affectedRows > 0) {
          console.log("Admin user created successfully");
        } else {
          console.log("Admin user already exists");
        }
      }
    );

    // create table for categories

    const createCategoriesTableQuery = `
    CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    `;

    db.query(createCategoriesTableQuery, (err, result) => {
      if (err) {
        console.error("Error creating categories table:", err.message);
        return;
      }
      console.log("Categories table ready or already exists");
    });

    // create table for menu items

    const createMenuItemsTableQuery = `
    CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  categoryId INT,
  isVeg BOOLEAN DEFAULT 0,
  isFeatured BOOLEAN DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES
  categories(id) ON DELETE CASCADE
)
    `;

    db.query(createMenuItemsTableQuery, (err, result) => {
      if (err) {
        console.error("Error creating menu items table:", err.message);
        return;
      }
      console.log("Menu items table ready or already exists");
    });
  });
});

module.exports = db;
