import { create, listTripsOptions } from "./trips.controller";

import CRUDController from "../../crud/crud.controller";
import CRUDRouter from "../../crud/crud.router";
import { Trip } from "../../db/models";
import express from "express";
import { getSingleTrip } from "./trips.controller";
import passport from "passport";
import upload from "../../middleware/multer";

const router = express.Router();

const signInPassportMiddleware = passport.authenticate("jwt", {
  session: false,
});

router.use(
  new CRUDRouter(new CRUDController(Trip, "trip"), {
    createMW: [signInPassportMiddleware, upload.single("image")],
    updateMW: [signInPassportMiddleware],
  })
);

router.use(
  new CRUDRouter(new CRUDController(Trip, "trip", listTripsOptions), {
    createMW: [signInPassportMiddleware, upload.single("image"), create],
    destroyMW: [signInPassportMiddleware],
    updateMW: [signInPassportMiddleware],
  })
);

router.get("/:id", getSingleTrip);

export default router;
