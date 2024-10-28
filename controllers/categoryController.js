// controllers/categoryController.js
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

// Add a new category
exports.addCategory = async (req, res) => {
  const { name, description, status } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  const sql =
    "INSERT INTO categories (name, description, status, image, smallImage, mediumImage) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      description,
      status,
      image.filename,
      image.smallImage,
      image.mediumImage,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
          message: "Category added successfully",
          categoryId: result.insertId,
        });
    }
  );
};

// Get all categories
exports.getAllCategories = (req, res) => {
  const sql =
    "SELECT id, name, description, status, image, smallImage, mediumImage, createdAt FROM categories";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get a single category by ID
exports.getCategoryById = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT id, name, description, status, image, smallImage, mediumImage, createdAt FROM categories WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Category not found" });

    res.json(results[0]);
  });
};

// Edit (update) a category
exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const image = req.file;

  let sql = "UPDATE categories SET name = ?, description = ?, status = ?";
  const params = [name, description, status];

  if (image) {
    sql += ", image = ?, smallImage = ?, mediumImage = ?";
    params.push(image.filename, image.smallImage, image.mediumImage);
  }

  sql += " WHERE id = ?";
  params.push(id);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category updated successfully" });
  });
};

// Delete a category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  });
};
