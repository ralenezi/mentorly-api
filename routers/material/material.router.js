import { isMentor, isSignedIn } from "../../middleware/permissions";

import CRUDController from "../../crud/crud.controller";
import CRUDRouter from "../../crud/crud.router";
import { Lecture } from "../../db/models";
import { Material } from "../../db/models";
import express from "express";

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
const routers = new CRUDRouter(
  new CRUDController(Material, "material", listOptions),
  {
    listMW: [isSignedIn, isMentor],
    createMW: [isSignedIn, isMentor],
    destroyMW: [isSignedIn, isMentor],
    updateMW: [isSignedIn, isMentor],
  }
);
router.use(routers);

export default router;
