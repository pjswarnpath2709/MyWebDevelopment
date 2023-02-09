const Sequelize = require("sequelize");

// with pool we can run multiple queries simultaneously
const sequelize = new Sequelize("shop", "root", "pulkit27", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
