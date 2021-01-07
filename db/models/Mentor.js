module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define("Mentor", {
    bankInformation: DataTypes.STRING,
    cv: DataTypes.STRING,
  });

  return Mentor;
};
