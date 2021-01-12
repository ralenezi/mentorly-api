export const injectUpdatedBy = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    req.body.studentId = studentId;
    req.body.updatedBy = req.mentorId;
    console.log("Request.mentorID/STUDENTI", req.mentorId);
    // req.body.updatedBy = req.student.mentorId;

    // req.body.studentId = req.params.studentId;
    next();
  } catch (error) {
    next(error);
  }
};
