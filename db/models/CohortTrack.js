module.exports = (sequelize, DataTypes) => {
  const CohortTrack = sequelize.define("CohortTrack", {
    name: DataTypes.STRING,
  });

  return CohortTrack;
};
