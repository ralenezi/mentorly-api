module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    note: { type: DataTypes.STRING, allowNull: false },
    updatedBy: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Comment;
};
