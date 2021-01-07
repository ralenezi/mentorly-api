module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    iconImage: DataTypes.STRING,
  });

  return Track;
};
