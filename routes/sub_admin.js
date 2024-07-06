const express = require('express');
const router = express.Router();
const subAdminController = require('../controllers/sub_admin');

router.post('/create', subAdminController.createSubAdmin);
router.get('/all', subAdminController.getAllSubAdmins);
router.get('/:id', subAdminController.getSubAdminById);
router.put('/update/:id', subAdminController.updateSubAdmin);
router.delete('/:id', subAdminController.deleteSubAdmin);

module.exports = router;
