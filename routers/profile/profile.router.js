import { Profile, User } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";
import {
  getMyProfile,
  getProfilesFromIos,
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
    updatePath: "/",
    updateMW: [isSignedIn, updateProfile, upload.single("image")],
    createMW: [disabled],
    destroyMW: [disabled],
    listMW: [isSignedIn, getMyProfile],
  })
);
router.get("/ios", getProfilesFromIos);
router.get("/:id/trips", getTripsFromProfile);
router.get("/:id", getSingleProfile);
export default router;
