const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration[process.env.APP_ENV]);

module.exports = connection;