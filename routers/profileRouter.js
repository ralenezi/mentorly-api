import { Profile, User } from "../db/models";
import {
  getSingleProfile,
  getTripsFromProfile,
  updateProfile,
} from "../controllers/profileController";

import CRUDController from "../controllers/CRUDController";
import CRUDRouter from "./CRUDRouter";
import express from "express";
import passport from "passport";
import upload from "../middleware/multer";

const router = express.Router();
const signInPassportMiddleware = passport.authenticate("jwt", {
  session: false,
});

const disableRoute = (req, res, next) => {
  next({ message: "You don't have permission" });
};

router.use(
  new CRUDRouter(new CRUDController(Profile, "profile"), {
    updateMW: [signInPassportMiddleware, updateProfile, upload.single("image")],
    createMW: [disableRoute],
    destroyMW: [disableRoute],
    listMW: [disableRoute],
  })
);
router.get("/:id/trips", getTripsFromProfile);
router.get("/:id", getSingleProfile);

export default router;
