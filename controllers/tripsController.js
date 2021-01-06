import { Profile, Trip } from "../db/models";
export const create = (req, res, next) => {
  try {
    // get the profile
    req.body.profileId = req.user.profile.id;
    res.image = req.image;
    next();
  } catch (error) {
    next(error);
  }
};

export const getTripsForUser = async (req, res, next) => {
  const user = await Profile.findByPk(req.params.uid, {
    include: [{ model: Trip, as: "trips" }],
  });
};

export const listTripsOptions = {
  include: [
    {
      model: Profile,
      as: "profile",
      attributes: ["id", "name", "image"],
    },
  ],
};

export const getSingleTrip = async (req, res, next) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findByPk(tripId);
    if (trip) {
      res.json(trip);
    } else {
      const error = new Error();
      error.status = 404;
      error.message = `Trip with id ${tripId} doesn't exist`;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
