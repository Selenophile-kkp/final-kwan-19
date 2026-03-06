import createError from "http-errors";
import jwt from "jsonwebtoken";
import { findDoctorByUsername } from "../services/auth.service.js";

export async function authDoctorCheck(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createError(401, "Unauthorization");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_DOCTOR, {
      algorithms: ["HS256"],
    });
    const doctor = await findDoctorByUsername(payload.username);
    if (!doctor) {
      throw createError(401, "Unauthorization");
    }
    req.doctor = doctor;
    next();
  } catch (error) {
    next(error);
  }
}
