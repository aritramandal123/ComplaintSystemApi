const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');

router.post('/user', (req, res) => {
    login(req, res, 'user');
});

router.post('/admin', (req, res) => {
    login(req, res, 'admin');
});

module.exports = router;