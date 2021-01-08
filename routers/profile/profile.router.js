import { Profile, User } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";
import {
  getMyProfile,
  getSingleProfile,
  getTripsFromProfile,
  updateProfile,
} from "./profile.controller";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import express from "express";
import upload from "../../middleware/multer";

const router = express.Router();

router.use(
  new CrudRouter(new CrudController(Profile, "profile"), {
    updateMW: [isSignedIn, updateProfile, upload.single("image")],
    createMW: [disabled],
    destroyMW: [disabled],
    listMW: [
      isSignedIn,
      (req, res, next) => {
        console.log("Working", req.user);
      },
      getMyProfile,
    ],
  })
);
router.get("/:id/trips", getTripsFromProfile);
router.get("/:id", getSingleProfile);

export default router;
