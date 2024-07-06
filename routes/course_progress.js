const express = require('express');
const router = express.Router();
const course_progress = require('../controllers/course_progress');

router.get('/:id', course_progress.getCourseProgressById);
router.post('/create', course_progress.createCourseProgress);
router.put('/update/:id', course_progress.updateCourseProgress);
router.delete('/:id', course_progress.deleteCourseProgress);

module.exports = router;
