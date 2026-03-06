import {
  createNoteService,
  deleteNoteService,
  getAllNotes,
  getNoteByPatientId,
  updateDoctorById,
  updateNoteService,
  userReceiveNotes,
} from "../services/doctor.service.js";

//Doctor
export function getDoctorController(req, res) {
  const { username, specialization } = req.doctor;

  res.status(200).json({ username, specialization });
}

export async function updateDoctorController(req, res, next) {
  try {
    const doctorId = req.doctor.id;
    const { username, specialization } = req.body;

    const data = {};

    if (username) {
      data.username = username;
    }

    if (specialization) {
      data.specialization = specialization;
    }

    const updatedDoctor = await updateDoctorById(doctorId, data);

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: {
        id: updatedDoctor.id,
        username: updatedDoctor.username,
        specialization: updatedDoctor.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Doctor's note
export async function createNoteController(req, res, next) {
  try {
    const id = req.doctor.id;
    const { patientId, note } = req.body;

    return res.status(201).json(await createNoteService(id, patientId, note));
  } catch (error) {
    next(error);
  }
}

export async function findNotes(req, res, next) {
  try {
    const id = req.doctor.id;

    return res.status(200).json(await getAllNotes(id));
  } catch (error) {
    next(error);
  }
}

export async function findNoteByPatientId(req, res, next) {
  try {
    const patientId = Number(req.params.id);

    return res.status(200).json(await getNoteByPatientId(patientId));
  } catch (error) {
    next(error);
  }
}

export async function updateNoteController(req, res, next) {
  try {
    const id = req.doctor.id;

    const { patientId, note } = req.body;

    const data = {};

    if (note) data.note = note;

    return res.status(201).json(await updateNoteService(id, patientId, note));
  } catch (error) {
    next(error);
  }
}

export async function deleteNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    return res.status(200).json(await deleteNoteService(noteId));
  } catch (error) {
    next(error);
  }
}

// Patient gets notes from doctors
export async function getNoteFromDoctors(req, res, next) {
  try {
    const patientId = req.user.id;

    return res.status(200).json(await userReceiveNotes(patientId));
  } catch (error) {
    next(error);
  }
}
