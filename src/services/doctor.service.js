import { prisma } from "../config/prismaClient.js";

export const updateDoctorById = async (id, data) => {
  return await prisma.doctor.update({
    where: {
      id,
    },
    data: data,
  });
};

// Doctor's note section
export const createNoteService = async (doctorId, patientId, note) => {
  try {
    if (doctorId === undefined || patientId === undefined) {
      throw new Error(
        "Doctor ID or patient ID is undefined. Please check again!"
      );
    }

    return await prisma.doctorNote.create({
      data: {
        note,
        doctorId,
        userId: patientId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllNotes = async (doctorId) => {
  try {
    return await prisma.doctorNote.findMany({
      where: {
        doctorId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getNoteByPatientId = async (patientId) => {
  try {
    return await prisma.doctorNote.findMany({
      where: {
        userId: patientId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateNoteService = async (doctorId, patientId, note) => {
  try {
    return await prisma.doctorNote.update({
      where: {
        doctorId,
        userId: patientId,
      },
      data: {
        note,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteNoteService = async (noteId) => {
  try {
    return await prisma.doctorNote.delete({
      where: {
        id: noteId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// Patient receive notes
export const userReceiveNotes = async (patientId) => {
  try {
    return await prisma.doctorNote.findMany({
      where: {
        userId: patientId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
