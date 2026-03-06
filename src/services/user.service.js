import { prisma } from "../config/prismaClient.js";

export const updateUserById = async (id, data) => {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
