const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    _id: {
        type: String, // Matches your UUID: "314df863-..."
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

module.exports = mongoose.model('admin_creds', AccountSchema);