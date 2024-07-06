const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.get('/:id', user.getUserById);
router.put('/update/:id', user.updateUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
