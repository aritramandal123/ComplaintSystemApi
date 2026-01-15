const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');

router.post('/user', (req, res) => {
    register(req, res, 'user');
});


module.exports = router;