const mongoose = require('mongoose');
const User = require('./models/user');
const Client = require('./models/client');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tech_sp_db')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const seedDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();

        const users = [
            {
                fio: 'Иванов Иван Иванович',
                login: 'ivanov',
                password: 'password123'
            },
            {
                fio: 'Петров Петр Петрович',
                login: 'petrov',
                password: 'password456'
            }
        ];

        const clients = [
            {
                accountNumber: 123456,
                surname: 'Сидоров',
                name: 'Сидор',
                patronymic: 'Сидорович',
                birthDate: new Date('1990-01-01'),
                inn: '123456789012',
                responsibleFio: 'Иванов Иван Иванович',
                status: 'Не в работе'
            },
            {
                accountNumber: 654321,
                surname: 'Кузнецов',
                name: 'Кузьма',
                patronymic: 'Кузьмич',
                birthDate: new Date('1985-05-05'),
                inn: '210987654321',
                responsibleFio: 'Петров Петр Петрович',
                status: 'В работе'
            }
        ];

        await User.insertMany(users);
        await Client.insertMany(clients);

        console.log('Database seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
