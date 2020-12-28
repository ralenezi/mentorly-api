import { Trip, User } from "../db/models";
export const create = (req, res, next) => {
  try {
    console.log("Hello", req.user.id);
    req.body.userId = req.user.id;
    res.image = req.image;
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

export const listTripsOptions = {
  include: [
    {
      model: User,
      as: "user",
      attributes: ["name"],
    },
  ],
};
