module.exports = function(sequelize, DataTypes) {
  var Tryke = sequelize.define("Tryke", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Tryke;
};
