const express = require('express');
const router = express.Router();
const fs = require('fs');

const { login } = require('../controllers/loginController');
const cred = JSON.parse(fs.readFileSync('data/cred.json', 'utf8'));

router.post('/user', (req, res) => {
    login(req, res, 'user');
});

router.post('/admin', (req, res) => {
    login(req, res, 'admin');
});

module.exports = router;