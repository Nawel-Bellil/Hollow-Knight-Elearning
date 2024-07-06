const express = require('express');
const router = express.Router();
const courseProgressController = require('../controllers/course_progress');

router.get('/:id', courseProgressController.getCourseProgressById);
router.post('/create', courseProgressController.createCourseProgress);
router.put('/update/:id', courseProgressController.updateCourseProgress);
router.delete('/:id', courseProgressController.deleteCourseProgress);

module.exports = router;
