const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/process', paymentController.processPayment);
router.get('/student/:studentId', paymentController.getPaymentsByStudent);
router.delete('/:id', paymentController.cancelPayment);

module.exports = router;
