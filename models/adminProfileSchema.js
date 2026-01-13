const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    _id: {
        type: String, // Matching your UUID: "b65dfdb1-..."
        required: true
    },
    admin_name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Sales', 'Support', 'IT', 'Billing', 'Management'] // Optional validation
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('admin_profiles', AdminSchema);