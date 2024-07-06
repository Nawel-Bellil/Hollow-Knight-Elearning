const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.post('/create', admin.createAdmin);
router.post('/login', admin.loginAdmin);
router.get('/all', admin.getAllAdmins);
router.get('/:id', admin.getAdminById);
router.get('/', admin.getAdmin);
router.delete('/:id', admin.deleteAdmin);
router.put('/update/:id', admin.updateAdmin);

module.exports = router;
