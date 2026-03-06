import express from "express";
import {
  loginDoctorController,
  registerDoctorController,
  registerUserController,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register/doctor", registerDoctorController);
authRouter.post("/register/user", registerUserController);
authRouter.post("/login/doctor", loginDoctorController);

export default authRouter;
