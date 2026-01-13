const express = require('express');
const router = express.Router();

const { newComplaints, updateComplaints } = require('../controllers/complaintsOperations');

router.post('/user/submit', (req, res) => {
    newComplaints(req, res);
});

router.post('/admin/update', (req, res) => {
    const { id } = req.body;
    updateComplaints(req, res, id);
});
module.exports = router;