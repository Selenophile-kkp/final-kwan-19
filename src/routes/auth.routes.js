import express from "express";
import {
  loginDoctorController,
  loginUserController,
  registerDoctorController,
  registerUserController,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register/doctor", registerDoctorController);
authRouter.post("/register/user", registerUserController);
authRouter.post("/login/doctor", loginDoctorController);
authRouter.post("/login/user", loginUserController);

export default authRouter;
