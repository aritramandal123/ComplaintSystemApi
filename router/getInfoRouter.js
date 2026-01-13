const express = require('express');
const router = express.Router();
const { getInfo, getComplaints, getAllComplaints, getAllEmployees } = require('../controllers/getInfo');

router.post('/userInfo', (req, res) => {
    const { id } = req.body;
    getInfo(req, res, id, 'users');
});

router.post('/adminInfo', (req, res) => {
    const { id } = req.body;
    getInfo(req, res, id, 'admin');
});

router.post('/user/complaints', (req, res) => {
    const { id, userType } = req.body;
    getComplaints(req, res, id, userType);
});

router.post('/admin/complaints', (req, res) => {
    const { id } = req.body;
    getAllComplaints(req, res, id);
});

router.post('/admin/employees', (req, res) => {
    const { id } = req.body;
    getAllEmployees(req, res, id);
});

module.exports = router;