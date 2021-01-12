import { transformFromAstSync } from "@babel/core";

export const injectUpdatedBy = async (req, res, next) => {
  try {
    req.body.studentId = req.params.studentId;
    console.log("Request.PARAMS/STUDENTI", req.params);
    // req.body.updatedBy = req.student.mentorId;
    console.log("Request.mentorID/STUDENTI", req.mentorId);
    // req.body.updatedBy = req.student.mentorId;

    // req.body.studentId = req.params.studentId;
    next();
  } catch (error) {
    next(error);
  }
};
