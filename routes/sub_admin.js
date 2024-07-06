const express = require('express');
const router = express.Router();
const sub_admin = require('../controllers/sub_admin');

router.post('/create', sub_admin.createSubAdmin);
router.get('/all', sub_admin.getAllSubAdmins);
router.get('/:id', sub_admin.getSubAdminById);
router.put('/update/:id', sub_admin.updateSubAdmin);
router.delete('/:id', sub_admin.deleteSubAdmin);

module.exports = router;
