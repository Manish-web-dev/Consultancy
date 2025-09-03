import express from "express";
import Contact from "../model/contactschema.js";
import sendEmail from "../Mail/sendEmail.js";
import multer from "multer";
const router = express.Router();

const upload = multer(); // for parsing multipart/form-data

// Render the contact form (GET)
router.get('/contact', (req, res) => {
  res.render('contact'); // Make sure you have views/contact.ejs
});

// Handle contact form submissions (POST)
router.post('/', upload.none(), async (req, res) => {
  // Defensive: check if req.body exists
  if (!req.body) {
    return res.status(400).send('No form data received');
  }
  try {
    let { name, email, phone_no, message } = req.body;
    // Basic field check
    if (!name || !email || !phone_no || !message) {
      return res.status(400).send('All fields are required');
    }
    // Ensure phone_no is a string (handle array case)
    if (Array.isArray(phone_no)) {
      phone_no = phone_no[0];
    }
    // Save contact form submission to the database
    const newContact = new Contact({
      name,
      email,
      phone_no,
      message
    });
    await newContact.save();
    // Send email notification to the specified email address
    const subject = 'Contact Form Submission';
    const text = 
      `You have received a new contact form submission:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone No: ${phone_no}\n` +
      `Message: ${message}\n`;
    await sendEmail('repaircloudnepal@gmail.com', subject, text); // Use sendEmail function
    res.send('Message sent successfully');
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).send('Failed to process contact form submission');
  }
});

export default router;