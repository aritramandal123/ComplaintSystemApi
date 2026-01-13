const jwt = require('jsonwebtoken');
const profile = require('../data/profile.json');
const complaints = require('../data/complaints.json');
const employees = require('../data/employee.json');
const complaintModel = require('../models/complaintsSchema');
const userProfileModel = require('../models/user_profileSchema');
const adminProfileModel = require('../models/adminProfileSchema');
const employeeModel = require('../models/employeeSchema');
require('dotenv').config();
const getInfo = async (req, res, id, userType) => {
    console.log('GetInfo request for ID:', id);
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

    // const userProfile = profile[`${userType}_profile`].find(u => u._id === id);
    // if (userProfile) {
    //     res.status(200).json({ profile: userProfile });
    //     console.log('userProfile found:', userProfile);
    // } else {
    //     res.status(404).json({ message: 'User profile not found' });
    // }

    const userProfile = await (userType === 'users' ?
        userProfileModel.findOne({ _id: id }) :
        adminProfileModel.findOne({ _id: id }));
    if (userProfile) {
        res.status(200).json({ profile: userProfile });
    } else {
        res.status(404).json({ message: 'User profile not found' });
    }
}

const getComplaints = async (req, res, id) => {
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
    // const userProfile = profile.users_profile.find(u => u._id === id);
    // const userComplaints = userProfile.complaints;
    // const detailedComplaints = complaints.filter(c =>
    //     userComplaints.includes(c.complaintId)
    // );
    // if (detailedComplaints) {
    //     res.status(200).json({ complaints: detailedComplaints });
    //     console.log('userComplaints found:', detailedComplaints);
    // } else {
    //     res.status(404).json({ message: 'User complaints not found' });
    // }
    const userProfile = await userProfileModel.findOne({ _id: id });
    if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
    }
    const userComplaintsIds = userProfile.complaints;
    const detailedComplaints = await complaintModel.find({ complaintId: { $in: userComplaintsIds } });
    res.status(200).json({ complaints: detailedComplaints });
}

const getAllComplaints = async (req, res, id) => {
    console.log('GetAllComplaints request by admin ID:', id);
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
    // res.status(200).json({ complaints: complaints });
    const allComplaints = await complaintModel.find({});
    res.status(200).json({ complaints: allComplaints });
};

const getAllEmployees = async (req, res, id) => {
    console.log('GetAllEmployees request by admin ID:', id);
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
    const emp = await employeeModel.find({});
    res.status(200).json({ employees: emp });
};
module.exports = { getInfo, getComplaints, getAllComplaints, getAllEmployees };