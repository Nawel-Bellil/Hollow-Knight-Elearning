const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/create', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/all', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.get('/', adminController.getAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.put('/update/:id', adminController.updateAdmin);

module.exports = router;
