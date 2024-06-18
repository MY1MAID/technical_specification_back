const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Маршрут для логина
router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await User.findOne({ login, password });
    if (user) {
        req.session.userId = user._id;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid login or password' });
    }
});

// Маршрут для логаута
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: 'Failed to logout' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

module.exports = router;
