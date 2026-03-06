import express from "express";
import {
  createNoteController,
  findNoteByPatientId,
  findNotes,
  getDoctorController,
  updateDoctorController,
  updateNoteController,
} from "../controllers/doctor.controllers.js";
import { authDoctorCheck } from "../middlewares/authenDoctor.middleware.js";

const doctorRouter = express.Router();

doctorRouter.get("/me", authDoctorCheck, getDoctorController);
doctorRouter.put("/me", authDoctorCheck, updateDoctorController);

// Doctor's note route
doctorRouter.post("/createNote", authDoctorCheck, createNoteController);
doctorRouter.get("/notes", authDoctorCheck, findNotes);
doctorRouter.get("/notes/user/:id", authDoctorCheck, findNoteByPatientId);
doctorRouter.put("/notes/:id", authDoctorCheck, updateNoteController);

export default doctorRouter;
