import passport from "passport";

export const isSignedIn = passport.authenticate("jwt", {
  session: false,
});

export const isMentor = (req, res, next) => {
  console.log(req.user);
  if (req.user.mentor != null) {
    next();
  } else {
    next(
      new Error(
        "You should be signed in as a mentor in order to access this page!"
      )
    );
  }
};

export const isStudent = (req, res, next) => {
  if (req.user.student != null) {
    next();
  } else {
    next(
      new Error(
        "You should be signed in as a student in order to access this page!"
      )
    );
  }
};
