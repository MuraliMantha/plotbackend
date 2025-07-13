const Enquiry = require('../models/enquiry');

// Create an enquiry
const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry({ ...req.body, time: new Date() });
    await enquiry.save();
    res.status(201).json({ success: true, message: 'Enquiry submitted' });
  } catch (error) {
    console.error('❌ Error submitting enquiry:', error);
    res.status(400).json({ success: false, message: 'Invalid enquiry data', error: error.message });
  }
};

// Get all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ time: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('❌ Error fetching enquiries:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createEnquiry, getAllEnquiries };