"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/** Connect is a method that connects the database to postgres database
 * @param {function} cb - your call back function such as app.listen or anything you want to happen when the database is connected
 * @param {object} options - alter: true or force true. By default it's `alter: true`
 */

/*
    Profiles and groups relationships 

    User ---> Profile  
                --> Student
                --> Mentor
 */

// User >----< Profile
db.User.hasOne(db.Profile, {
  as: "profile",
  foreignKey: { name: "userId", allowNull: false },
});
db.Profile.belongsTo(db.User, { foreignKey: "userId" });

// Students + Mentors
// Profile >-----< Student
db.Profile.hasOne(db.Student, { foreignKey: "profileId" });
db.Student.belongsTo(db.Profile, { as: "profile", foreignKey: "profileId" });
// Profile >-----< Mentor
db.Profile.hasOne(db.Mentor, {
  foreignKey: { name: "profileId", allowNull: false },
});
db.Mentor.belongsTo(db.Profile, {
  as: "mentor",
  foreignKey: { name: "profileId", allowNull: false },
});
// Track >-----< Mentor
db.Track.hasMany(db.Mentor, { foreignKey: "trackId" });
db.Mentor.belongsTo(db.Track, { foreignKey: "trackId" });

module.exports = db;
