const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegrambotdbv2',
    'postgres',
    '529532',
    {
        dialect: 'postgres',
        host:'localhost',
        port:'5432',
    }
)