const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegrambotdb',
    'postgres',
    '529532',
    {
        dialect: 'postgres',
        host:'localhost',
        port:'5432',
    }
)