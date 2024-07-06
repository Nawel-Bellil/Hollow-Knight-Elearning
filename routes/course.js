const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

router.post('/create', courseController.createCourse);
router.get('/all', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/update/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
