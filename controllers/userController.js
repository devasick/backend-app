// controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = (req, res) => {
  const { name, username, email, password, status, type } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (name, username, email, password, status, type) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, username, email, hashedPassword, status, type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: results[0].id, type: results[0].type }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({ message: 'Login successful', token,
      user: {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
        type: results[0].type,
        status: results[0].status,
      },
     });
  });
};

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, username, email, status, type, createdAt FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT id, name, username, email, status, type, createdAt FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    
    res.json(results[0]);
  });
};

// Edit (update) user details
exports.editUser = (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, status, type } = req.body;

  let sql = 'UPDATE users SET name = ?, username = ?, email = ?, status = ?, type = ?';
  const values = [name, username, email, status, type];

  // Check if the password needs to be updated
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql += ', password = ?';
    values.push(hashedPassword);
  }
  sql += ' WHERE id = ?';
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    
    res.json({ message: 'User updated successfully' });
  });
};
