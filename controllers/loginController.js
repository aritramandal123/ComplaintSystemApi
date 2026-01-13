const jwt = require('jsonwebtoken');
const UserCredModel = require('../models/userCredSchema');
const AdminCredModel = require('../models/adminCredSchema');

require('dotenv').config();
const login = async (req, res, userType) => {
    const { email, password } = req.body;
    const user = await (userType === 'user' ?
        UserCredModel.findOne({ email, password }) :
        AdminCredModel.findOne({ email, password }));

    if (user) {
        // Create a token containing the userId
        // 'SECRET_KEY' should be a long random string in your .env file
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Generated JWT token for user:', user._id);
        // Send the token and the userId (for UI convenience)
        res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: user._id
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { login };