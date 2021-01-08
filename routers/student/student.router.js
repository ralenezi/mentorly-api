import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Student } from "../../db/models";
import express from "express";
import passport from "passport";
import upload from "../../middleware/multer";
const router = express.Router();

const listOptions = {
  //   attributes: ["fullName"],
};
const signInPassportMiddleware = passport.authenticate("jwt", {
  session: false,
});

const controllers = new CrudController(Student, "student", listOptions);
const routers = new CrudRouter(controllers, {
  createMW: [signInPassportMiddleware, upload.single("image")],
});

router.use(routers);

export default router;
