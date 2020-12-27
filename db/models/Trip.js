module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    long: DataTypes.STRING,
    lat: DataTypes.STRING,
  });

  return Trip;
};
