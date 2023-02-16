const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodepractice', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;