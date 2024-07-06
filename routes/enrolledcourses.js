const express = require('express');
const router = express.Router();
const enrolledCoursesController = require('../controllers/enrolledcourses');

router.post('/enroll', enrolledCoursesController.enrollStudent);
router.get('/all', enrolledCoursesController.getAllEnrolledCourses);
router.get('/:id', enrolledCoursesController.getEnrolledCourseById);
router.delete('/:id', enrolledCoursesController.unenrollStudent);

module.exports = router;
