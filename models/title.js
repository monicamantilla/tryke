module.exports = function(sequelize, DataTypes) {
  var Title = sequelize.define("Title", {
    text: DataTypes.STRING
  });

  Title.associate = function(models) {
    Title.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Title;
};
