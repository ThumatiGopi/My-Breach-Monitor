const mongoose = require('mongoose');

const breachSchema = new mongoose.Schema({
    email: { type: String, required: true },
    breaches: { type: Array, required: true },
    checkedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Breach', breachSchema);