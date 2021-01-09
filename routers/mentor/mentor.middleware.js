import { Mentor } from "../../db/models";
const injectMentorInRequest = async (req, res, next) => {
  try {
    const mentor = await Mentor.findByPk(req.user.mentor.id);
    req.mentor = mentor;
    next();
  } catch (error) {
    next(error);
  }
};
