const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    _id: {
        type: String, // Matches your UUID: "b0641464-..."
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevents duplicate accounts
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('user_creds', AccountSchema);