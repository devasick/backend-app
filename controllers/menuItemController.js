// controllers/foodItemController.js
const db = require("../config/db");

// Add a new food item
exports.addFoodItem = (req, res) => {
  const { name, description, price, categoryId, isVeg, isFeatured, status } =
    req.body;

  const sql =
    "INSERT INTO menu_items (name, description, price, categoryId, isVeg, isFeatured, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, description, price, categoryId, isVeg, isFeatured, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Food item added successfully",
        itemId: result.insertId,
      });
    }
  );
};

// Get all food items
exports.getAllFoodItems = (req, res) => {
  const sql = `
    SELECT fi.id, fi.name, fi.description, fi.price, fi.isVeg, fi.isFeatured, fi.status, fi.createdAt, c.name AS category
    FROM menu_items fi
    LEFT JOIN categories c ON fi.categoryId = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get a single food item by ID
exports.getFoodItemById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT fi.id, fi.name, fi.description, fi.price, fi.isVeg, fi.isFeatured, fi.status, fi.createdAt, c.name AS category
    FROM menu_items fi
    LEFT JOIN categories c ON fi.categoryId = c.id
    WHERE fi.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Food item not found" });

    res.json(results[0]);
  });
};

// Edit (update) a food item
exports.editFoodItem = (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId, isVeg, isFeatured, status } =
    req.body;

  const sql =
    "UPDATE menu_items SET name = ?, description = ?, price = ?, categoryId = ?, isVeg = ?, isFeatured = ?, status = ? WHERE id = ?";
  db.query(
    sql,
    [name, description, price, categoryId, isVeg, isFeatured, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Food item not found" });

      res.json({ message: "Food item updated successfully" });
    }
  );
};

// Delete a food item
exports.deleteFoodItem = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM menu_items WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Food item not found" });

    res.json({ message: "Food item deleted successfully" });
  });
};
