import createError from "http-errors";
import jwt from "jsonwebtoken";
import { findUserByUsername } from "../services/auth.service.js";

export async function authUserCheck(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createError(401, "Unauthorization");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_USER, {
      algorithms: ["HS256"],
    });
    const user = await findUserByUsername(payload.username);
    if (!user) {
      throw createError(401, "Unauthorization");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
