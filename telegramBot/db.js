const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'job_life_v5',
    'postgres',
    '529532',
    {
        dialect: 'postgres',
        host:'localhost',
        port:'5432',
    }
)