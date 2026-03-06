import bcrypt from "bcrypt";
import { updateUserById } from "../services/user.service.js";

//User
export function getUserController(req, res) {
  const { username } = req.user;
  res.status(200).json({ username });
}

export async function updateUserController(req, res, next) {
  const id = req.user.id;

  try {
    const { username } = req.body;

    const data = {};

    if (username) {
      data.username = username;
    }

    await updateUserById(id, data);

    res.status(201).json({ message: "User updated successfully!" });
  } catch (error) {
    next(error);
  }
}
