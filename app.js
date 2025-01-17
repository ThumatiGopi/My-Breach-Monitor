const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const nodemailer = require('nodemailer'); // Add Nodemailer
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public')); // Ensure this line is present

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Change this if you're using a different email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address (e.g., your-email@gmail.com)
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Endpoint to check for breaches
app.post('/checkBreach', async (req, res) => {
    const email = req.body.email;

    console.log('Checking breach for email:', email); // Log the email being checked

    try {
        // Call the XPOSE API (or any breach detection API)
        const response = await axios.get(`https://api.xposedornot.com/v1/check-email/${email}`);
        
        // Log the entire response for debugging
        console.log('API Response:', response.data);

        // If breaches are found, send email notification
        if (response.data.breaches) {
            // Send email about the breach
            sendEmailNotification(email, 'Data Breach Alert', `Your email ${email} has been involved in a data breach. Please take immediate action.`);
            return res.status(200).json({ breaches: response.data.breaches[0] });
        }

        // If no breaches are found, send email about safety
        sendEmailNotification(email, 'No Data Breach Detected', `Your email ${email} is safe. No data breaches detected.`);
        return res.status(200).json({ message: 'No breaches found.' });
    } catch (error) {
        // Log detailed error information
        console.error('Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while checking breaches.' });
    }
});

// Function to send email notification
function sendEmailNotification(to, subject, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: to,                       // Recipient address
        subject: subject,             // Subject line
        text: message                 // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
