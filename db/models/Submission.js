module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("Submission", {
    status: DataTypes.STRING,
    score: DataTypes.DOUBLE,
    comment: DataTypes.STRING,
  });

  return Submission;
};
