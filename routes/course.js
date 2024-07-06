const express = require('express');
const router = express.Router();
const course = require('../controllers/course');

router.post('/create', course.createCourse);
router.get('/all', course.getAllCourses);
router.get('/:id', course.getCourseById);
router.put('/update/:id', course.updateCourse);
router.delete('/:id', course.deleteCourse);

module.exports = router;
