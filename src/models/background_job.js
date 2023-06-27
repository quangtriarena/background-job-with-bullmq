const { DataTypes } = require("sequelize");
const postgresConnection = require("../configs/connectors/postgres.js");

const Model = postgresConnection.define("background_jobs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  queue: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.ENUM("PENDING", "RUNNING", "COMPLETED", "FAILED", "CANCELED"),
    defaultValue: "PENDING",
  },

  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  result: {
    type: DataTypes.JSON,
    defaultValue: null,
  },
});

Model.sync()
  .then((_res) => {
    console.log("Model background_jobs sync complete");
  })
  .catch((err) => console.error(err));

module.exports = Model;
