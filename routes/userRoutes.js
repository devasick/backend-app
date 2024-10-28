// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/users/add',auth, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', auth, userController.getAllUsers); // Authenticated route
router.get('/users/edit/:id', auth, userController.getUserById);
// Edit a user's details
router.put('/users/edit/:id', auth, userController.editUser);

module.exports = router;
