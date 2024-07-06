const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizz');

router.post('/create', quizzController.createQuizz);
router.get('/:courseId', quizzController.getQuizzByCourse);
router.put('/update/:courseId', quizzController.updateQuizz);
router.delete('/:courseId', quizzController.deleteQuizz);

module.exports = router;
