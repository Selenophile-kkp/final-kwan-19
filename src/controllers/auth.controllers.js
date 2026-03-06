import createError from "http-errors";
import {
  createDoctor,
  createDoctorToken,
  createUser,
  createUserToken,
  findDoctorByUsername,
  findUserByUsername,
} from "../services/auth.service.js";
import bcrypt from "bcrypt";

export async function registerDoctorController(req, res, next) {
  const { username, password, specialization } = req.body;
  try {
    const doctor = await findDoctorByUsername(username);
    if (doctor) {
      throw createError(400, "username already exist");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    console.log("specialization", specialization);
    const newDoctor = await createDoctor(
      username,
      hashPassword,
      specialization
    );
    res.status(201).json({
      message: "Register Success",
      doctor: {
        id: newDoctor.id,
        username: newDoctor.username,
        specialization: newDoctor.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function registerUserController(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (user) {
      throw createError(400, "username already exist");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await createUser(username, hashPassword);
    res.status(201).json({
      message: "Register Success",
      doctor: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function loginDoctorController(req, res, next) {
  const { username, password } = req.body;
  try {
    const doctor = await findDoctorByUsername(username);
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!doctor || !isMatch) {
      throw createError(401, "Invaliid credentials");
    }
    const token = await createDoctorToken(doctor);
    res.status(201).json({
      message: "Login Success",
      token: token,
      doctor: {
        id: doctor.id,
        username: doctor.username,
        specialization: doctor.specialization,
      },
    });

    next();
  } catch (error) {
    console.error(error);
  }
}

export async function loginUserController(req, res, next) {
  const { username, password } = req.body;
  console.log(password);
  try {
    const user = await findUserByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      throw createError(401, "Invaliid credentials");
    }
    const token = await createUserToken(user);
    res.status(201).json({
      message: "Login Success",
      token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
}
