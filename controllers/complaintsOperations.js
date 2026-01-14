const jwt = require('jsonwebtoken');
const complaintModel = require('../models/complaintsSchema');
const userProfileModel = require('../models/user_profileSchema');
require('dotenv').config();
const fs = require('fs');
const newComplaints = async (req, res) => {
    const { userId, title, category, description } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: Invalid token for user' });
        }
    }
    catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    console.log('UpdateComplaints request body:', req.body);
    console.log('Incoming New Complaint for User:', userId);

    try {
        // A. Verify the User Profile exists in MongoDB
        const userProfile = await userProfileModel.findById(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        // B. Generate a unique Complaint ID 
        // We count documents to increment the ID safely
        const totalDocs = await complaintModel.countDocuments();
        const newComplaintId = `C-2026-${totalDocs + 1001}`;

        // C. Create the Document using the Schema
        const newComplaint = new complaintModel({
            complaintId: newComplaintId,
            userId: userId,
            title: title,
            description: description,
            status: 'pending', // Match your schema enum if applicable
            category: category,
            date: new Date().toISOString(), // Full ISO string is better for DB
            priority: 'medium'
        });

        // D. Save the Complaint to MongoDB
        const savedComplaint = await newComplaint.save();

        // E. Update User Profile's complaints array using $push
        // This is atomic - much safer than fs.writeFileSync
        await userProfileModel.findByIdAndUpdate(userId, {
            $push: { complaints: newComplaintId }
        });

        console.log('Database updated successfully for ID:', newComplaintId);

        res.status(200).json({
            code: 200,
            message: 'Complaint submitted successfully',
            complaint: savedComplaint
        });

    } catch (error) {
        console.error('Database Error during submission:', error);
        res.status(500).json({
            code: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const updateComplaints = async (req, res, id) => {
    const { complaint } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId !== id) {
            return res.status(403).json({ message: 'Forbidden: Invalid token for user' });
        }
    }
    catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    try {
        // Find by custom complaintId and update
        const updatedComplaint = await complaintModel.findOneAndUpdate(
            { complaintId: complaint.complaintId },
            { $set: complaint }, // Only update the fields provided
            { new: true, runValidators: true } // Return the updated doc & check schema rules
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        console.log('Complaint record updated in Atlas:', updatedComplaint.complaintId);

        res.status(200).json({
            code: 200,
            message: 'Complaint updated successfully',
            complaint: updatedComplaint
        });

    } catch (error) {
        console.error('Database Error during update:', error);
        res.status(500).json({
            code: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = { newComplaints, updateComplaints };