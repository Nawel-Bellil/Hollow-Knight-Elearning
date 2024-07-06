const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/all', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/update/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
