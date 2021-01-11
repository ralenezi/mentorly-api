module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define("Mentor", {
    bankInformation: DataTypes.STRING,
    cv: DataTypes.STRING,
    status: DataTypes.STRING,
    officeHours: DataTypes.STRING,
  });

  return Mentor;
};
