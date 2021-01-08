import { isMentor, isSignedIn } from "../../middleware/permissions";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Lecture } from "../../db/models";
import { Material } from "../../db/models";
import express from "express";
import { listLecturesFromTrack } from "./material.controller";

const listOptions = {
  include: [
    {
      model: Lecture,
      as: "lecture",
      attributes: ["title"],
    },
  ],
};

const router = express.Router();
const routers = new CrudRouter(
  new CrudController(Material, "material", listOptions),
  {
    listMW: [isSignedIn, isMentor],
    createMW: [isSignedIn, isMentor],
    destroyMW: [isSignedIn, isMentor],
    updateMW: [isSignedIn, isMentor],
  }
);
router.use(routers);
// manual controllers
router.get("/:track", listLecturesFromTrack);

export default router;
