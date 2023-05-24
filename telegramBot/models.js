const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    chatId: {
        type: DataTypes.STRING,

    },
    shiftDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    shiftType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
