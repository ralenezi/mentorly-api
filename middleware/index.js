import cors from "cors";
import express from "express";
const multer = require("./multer");
export const preMiddleware = express.Router();
export const postMiddleware = express.Router();
const { errorMiddleware, notFoundMiddleware } = require("./errorMiddleware");

const path = require("path");
const passport = require("passport");

const { localStrategy, jwtStrategy } = require("./passport");
// Middleware
preMiddleware.use(cors());
preMiddleware.use(express.json());
preMiddleware.use(express.urlencoded({ extended: false }));
preMiddleware.use("/media", express.static(path.join(__dirname, "media")));
// Passport
preMiddleware.use(passport.initialize());
passport.use(localStrategy); // authentication
passport.use(jwtStrategy); // authorization

// Error middle wares
postMiddleware.use(errorMiddleware);
postMiddleware.use(notFoundMiddleware);
