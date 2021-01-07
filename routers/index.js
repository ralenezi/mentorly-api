import adminBroRoute from "./admin/adminBro";
import authRouter from "./auth/auth.router";
import express from "express";
import lectureRouter from "./material/lecture.router";
import materialRouter from "./material/material.router";
import profileRouter from "./profile/profile.router";
import studentsRouter from "./student/student.router";
const routers = express.Router();

routers.use(authRouter);
routers.use("/profile", profileRouter);
routers.use("/admin", adminBroRoute);
routers.use("/students", studentsRouter);
routers.use("/lectures", lectureRouter);
routers.use("/material", materialRouter);

export default routers;
