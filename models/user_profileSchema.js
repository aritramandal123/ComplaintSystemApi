const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // Since you are using UUIDs like "ca366c2c..."
        required: true
    },
    full_name: { type: String, required: true },
    phone: { type: String },
    joined_date: { type: String }, // You can use Date, but matching your JSON string for now
    complaints: [{ type: String }] // Array of complaint IDs (C-2026-...)
}, { timestamps: true });

module.exports = mongoose.model('user_profiles', UserSchema);