import authRouter from "./authentication";
import express from "express";
const routers = express.Router();

routers.use(authRouter);

export default routers;
