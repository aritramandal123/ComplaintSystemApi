const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true, // Ensures no two employees have the same ID
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        // Optional: you can add an enum if you have specific roles
        enum: ['Backend', 'Frontend', 'Fullstack', 'DevOps', 'QA']
    },
    seniority: {
        type: String,
        required: true,
        enum: ['Junior', 'Mid', 'Senior', 'Lead']
    },
    isRemote: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('technicians', EmployeeSchema);