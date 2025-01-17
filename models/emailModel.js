const mongoose = require('mongoose');

// Define a schema for storing emails
const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    breachStatus: { type: String, default: 'Checked' },  // e.g., 'Checked', 'Safe', 'Breach Found'
    dateSubmitted: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
