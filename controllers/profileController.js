import { Profile, Trip } from "../db/models";
export const updateProfile = async (req, res, next) => {
  console.log("________\n\n\n\n", req.user.profileId);
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  });
  req.id = profile.id;
  next();
};

export const getSingleProfile = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await Profile.findByPk(id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export const getTripsFromProfile = async (req, res, next) => {
  try {
    const profileId = req.params.id;
    console.log(profileId);
    const trips = await Trip.findAll({
      where: {
        profileId: profileId,
      },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};
