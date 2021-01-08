module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define("Cohort", {
    name: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    activated: DataTypes.BOOLEAN,
  });

  return Cohort;
};
