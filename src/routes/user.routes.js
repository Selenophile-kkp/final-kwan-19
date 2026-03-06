import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/user.controllers.js";
import { authUserCheck } from "../middlewares/authenUser.middleware.js";
import {
  deleteHealthRecordByIdController,
  getHealthRecordByIdController,
  getHealthRecordController,
  updateHealthRecordByIdController,
  userCreateHealthRecordController,
} from "../controllers/health.controller.js";
import { getNoteFromDoctors } from "../controllers/doctor.controllers.js";

const userRouter = express.Router();

userRouter.get("/me", authUserCheck, getUserController);
userRouter.put("/me", authUserCheck, updateUserController);

// Health record
userRouter.post(
  "/create/health-record",
  authUserCheck,
  userCreateHealthRecordController
);
userRouter.get("/get/health-record", authUserCheck, getHealthRecordController);
userRouter.get(
  "/get/health-record/:id",
  authUserCheck,
  getHealthRecordByIdController
);
userRouter.put(
  "/update/health-record/:id",
  authUserCheck,
  updateHealthRecordByIdController
);
userRouter.delete(
  "/delete/health-record/:id",
  authUserCheck,
  deleteHealthRecordByIdController
);

// Get notes from doctors
userRouter.get("/doctor-notes/received", authUserCheck, getNoteFromDoctors);

export default userRouter;
