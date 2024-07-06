const express = require('express');
const router = express.Router();
const student = require('../controllers/student');

router.get('/all', student.getAllStudents);
router.get('/:id', student.getStudentById);
router.put('/update/:id', student.updateStudent);
router.delete('/:id', student.deleteStudent);

module.exports = router;
