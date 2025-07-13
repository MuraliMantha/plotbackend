const express = require('express');
const router = express.Router();
const { createEnquiry, getAllEnquiries } = require('../controllers/enquiryController');
const auth = require('../middleware/auth');

router.post('/enquire', createEnquiry);
router.get('/enquiries', auth, getAllEnquiries);

module.exports = router;