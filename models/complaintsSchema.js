const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    // Explicitly defining complaintId if you want to keep your custom string format
    complaintId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        enum: ['pending', 'in-progress', 'resolved', 'closed'],
        default: 'pending'
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        lowercase: true,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'low'
    },
    technician: {
        type: String,
        default: 'unassigned'
    }
}, {
    // Automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);