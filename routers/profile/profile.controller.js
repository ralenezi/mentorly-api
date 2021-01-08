import { Mentor, Profile, Student, Track, Trip, User } from "../../db/models";
export const updateProfile = async (req, res, next) => {
  console.log("________\n\n\n\n", req.user.profileId);
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  });
  // crud controller takes an id to update something
  // we are kinda hacking around by passing
  req.params.id = profile.id;
  next();
};

export const getSingleProfile = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await Profile.findByPk(id, {
      attributes: ["id", "image", "name", "bio"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
        {
          model: Student,
          as: "student",
          attributes: ["id", "grade", "schoolName"],
        },
        {
          model: Mentor,
          as: "mentor",
          attributes: ["id", "status"],
          include: [{ model: Track, as: "track", attributes: ["name"] }],
        },
      ],
    });
    if (profile) {
      profile.email = profile.user.email;
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  const { id } = req.user;
  console.log("USER: ", req.user);
  console.log(id);
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      attributes: ["id", "image", "name", "bio"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
          include: [{ model: Track, as: "track", attributes: ["name"] }],
        },
      ],
    });
    if (profile) {
      profile.email = profile.user.email;
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

export const getProfilesFromIos = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      include: [
        {
          model: Mentor,
          as: "mentor",
          include: [
            {
              model: Track,
              as: "track",
              where: {
                name: "iOS",
              },
            },
          ],
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};
