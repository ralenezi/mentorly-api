import { Trip, User } from "../db/models";
export const create = (req, res, next) => {
  try {
    console.log("Hello", req.user.id);
    req.body.userId = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};

export const getTripsForUser = async (req, res, next) => {
  const user = await User.findByPk(req.params.uid, {
    include: [{ model: Trip, as: "trips" }],
  });
};
