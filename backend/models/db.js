const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "dashboard_db",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log("Banco conectado"))
  .catch(err => console.error(err));

module.exports = sequelize;

 