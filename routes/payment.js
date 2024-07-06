const express = require('express');
const router = express.Router();
const payment = require('../controllers/payment');

router.post('/process', payment.processPayment);
router.get('/student/:studentId', payment.getPaymentsByStudent);
router.delete('/:id', payment.cancelPayment);

module.exports = router;
