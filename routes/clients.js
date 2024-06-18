const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const User = require('../models/user');

// Middleware для проверки аутентификации
const checkAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Маршрут для получения клиентов
router.get('/', checkAuth, async (req, res) => {
    const user = await User.findById(req.session.userId);
    const clients = await Client.find({ responsibleFio: user.fio });
    res.json(clients);
});

// Маршрут для обновления статуса клиента
router.post('/status', checkAuth, async (req, res) => {
    const { clientId, status } = req.body;
    await Client.findByIdAndUpdate(clientId, { status });
    res.json({ message: 'Status updated' });
});

module.exports = router;
