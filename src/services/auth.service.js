import { prisma } from "../config/prismaClient.js";
import jwt from "jsonwebtoken";

//Doctor
export const findDoctorByUsername = async (username) => {
  const doctor = await prisma.doctor.findFirst({
    where: { username: username },
  });
  return doctor;
};

export const createDoctor = async (username, hashPassword, specialization) => {
  const newDoctor = await prisma.doctor.create({
    data: {
      username,
      password: hashPassword,
      specialization,
    },
  });
  return newDoctor;
};

export const createDoctorToken = async (doctor) => {
  const payload = {
    id: doctor.id,
    username: doctor.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "5d",
  });
  return token;
};

//User
export const findUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: { username: username },
  });
  return user;
};

export const createUser = async (username, hashPassword) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
  });
  return newUser;
};
