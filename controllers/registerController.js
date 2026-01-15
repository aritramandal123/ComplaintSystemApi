const jwt = require('jsonwebtoken');
const UserCredModel = require('../models/userCredSchema');
const UserProfileModel = require('../models/user_profileSchema');
const crypto = require('crypto');

require('dotenv').config();
const register = async (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;
    const id = crypto.randomUUID();
    const user = await UserCredModel.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUserCred = new UserCredModel({
        _id: id,
        email,
        password
    });

    const newUserProfile = new UserProfileModel({
        _id: id,
        full_name: fullName,
        phone: phoneNumber,
        joined_date: new Date().toISOString(),
        complaints: []
    });

    try {
        await newUserCred.save();
        await newUserProfile.save();
    } catch (error) {
        newUserCred.remove();
        newUserProfile.remove();
        console.error('Error saving user:', error);
        return res.status(500).json({ message: 'Failed to register user' });
    }

    const token = jwt.sign(
        { userId: newUserCred._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(201).json({
        message: 'User registered successfully',
        token: token,
        userId: newUserCred.email
    });
};

module.exports = { register };
