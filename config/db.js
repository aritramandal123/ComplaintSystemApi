const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        console.log('URI:', URI); // Debugging line to check the URI
        const conn = await mongoose.connect(URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Stop the app if connection fails
    }
};

connectDB();

module.exports = connectDB;