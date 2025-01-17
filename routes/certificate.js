const express = require('express');
const router = express.Router();
const certificate = require('../controllers/certificate');

router.post('/issue', certificateController.issueCertificate);
router.get('/all', certificateController.getAllCertificates);
router.get('/student/:studentId', certificateController.getCertificatesByStudentId);

module.exports = router;
