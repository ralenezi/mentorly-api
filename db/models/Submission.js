module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("Submission", {
    status: DataTypes.STRING,
    score: DataTypes.STRING,
    comment: DataTypes.STRING,
  });

  return Submission;
};
