const express = require('express');
const router = express.Router();
const enrolledcourses = require('../controllers/enrolledcourses');

router.post('/enroll', enrolledcourses.enrollStudent);
router.get('/all', enrolledcourses.getAllEnrolledCourses);
router.get('/:id', enrolledcourses.getEnrolledCourseById);
router.delete('/:id', enrolledcourses.unenrollStudent);

module.exports = router;

