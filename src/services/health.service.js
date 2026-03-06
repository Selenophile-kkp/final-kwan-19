import { prisma } from "../config/prismaClient.js";

export const userCreateHealthRecordService = async (id, type, value) => {
  try {
    if (type === undefined || value === undefined) {
      throw new Error("Please insert type or/and value properly!");
    }

    const findUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw new Error("No such user found!");
    }

    const newRecord = await prisma.healthRecord.create({
      data: {
        userId: id,
        type,
        value,
      },
    });

    return {
      message: "Health record created successfully!",
      newRecord,
    };
  } catch (error) {}
};

export const getHealthRecordService = async (id) => {
  try {
    if (id === undefined) {
      throw new Error("Please insert user ID value properly!");
    }

    const findHealthRecord = await prisma.healthRecord.findFirst({
      where: {
        id,
      },
    });

    if (!findHealthRecord) {
      throw new Error("No such record found!");
    }

    return findHealthRecord;
  } catch (error) {
    console.error(error);
  }
};

export const getHealthRecordByIdService = async (userId, recordId) => {
  if (userId === undefined || recordId === undefined) {
    throw new Error("User ID or record ID is undefined. Please check again.");
  }

  const findRecord = await prisma.healthRecord.findFirst({
    where: {
      userId,
      id: recordId,
    },
  });

  if (!findRecord) {
    throw new Error("No such record found!");
  }

  return findRecord;
};

export const updateHealthRecordByIdService = async ({
  userId,
  recordId,
  data,
}) => {
  try {
    if (userId === undefined || recordId === undefined) {
      throw new Error("User ID or record ID is undefined. Please check again!");
    }

    return await prisma.healthRecord.update({
      where: {
        userId,
        id: recordId,
      },
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteHealthRecordByIdService = async (userId, recordId) => {
  try {
    if (userId === undefined || recordId === undefined) {
      throw new Error("User ID or record ID is undefined. Please check again!");
    }

    const deleteRecord = await prisma.healthRecord.delete({
      where: {
        userId,
        id: recordId,
      },
    });

    return {
      message: "Health record has been removed successfully.",
      deleteRecord,
    };
  } catch (error) {
    console.error(error);
  }
};
