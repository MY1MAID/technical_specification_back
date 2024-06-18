const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    inn: {
        type: String,
        required: true,
        unique: true
    },
    responsibleFio: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Не в работе', 'В работе', 'Отказ', 'Сделка закрыта'],
        default: 'Не в работе'
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
