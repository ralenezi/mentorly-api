import CRUDController from "../../crud/crud.controller";
import CRUDRouter from "../../crud/crud.router";
import { Lecture } from "../../db/models";
import { Material } from "../../db/models";
import express from "express";

const listOptions = {
  include: [
    {
      model: Material,
      as: "material",
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  ],
};

const router = express.Router();
const routers = new CRUDRouter(
  new CRUDController(Lecture, "lecture", listOptions)
);
router.use(routers);

export default router;
