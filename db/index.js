import db from "./models";
export const connect = async (cb, options = { force: true }) => {
  try {
    await db.sequelize.sync(options);
    console.log("Connection to the database successful!");
    cb();
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
