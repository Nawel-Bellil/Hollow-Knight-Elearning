const express = require('express');
const router = express.Router();
const quizz = require('../controllers/quizz');

router.post('/create', quizz.createQuizz);
router.get('/:courseId', quizz.getQuizzByCourse);
router.put('/update/:courseId', quizz.updateQuizz);
router.delete('/:courseId', quizz.deleteQuizz);

module.exports = router;
