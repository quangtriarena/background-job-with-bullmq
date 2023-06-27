const { Sequelize } = require("sequelize");

const postgresConnection = new Sequelize("arena-bull", "postgres", "123456tri", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = postgresConnection;
