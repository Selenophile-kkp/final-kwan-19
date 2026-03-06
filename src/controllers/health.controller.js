import { prisma } from "../config/prismaClient.js";
import {
  deleteHealthRecordByIdService,
  getHealthRecordByIdService,
  getHealthRecordService,
  updateHealthRecordByIdService,
  userCreateHealthRecordService,
} from "../services/health.service.js";

export const userCreateHealthRecordController = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { type, value } = req.body;

    return res
      .status(201)
      .json(await userCreateHealthRecordService(id, type, value));
  } catch (error) {
    next(error);
  }
};

export const getHealthRecordController = async (req, res, next) => {
  try {
    const id = req.user.id;

    return res.status(200).json(await getHealthRecordService(id));
  } catch (error) {
    next(error);
  }
};

export const getHealthRecordByIdController = async (req, res, next) => {
  try {
    const id = req.user.id;

    const recordId = Number(req.params.id);

    return res.status(200).json(await getHealthRecordByIdService(id, recordId));
  } catch (error) {
    next(error);
  }
};

export const updateHealthRecordByIdController = async (req, res, next) => {
  try {
    const id = req.user.id;

    const recordId = Number(req.params.id);
    const { type, value } = req.body;

    const data = {};

    if (type) {
      data.type = type;
    }

    if (value) {
      data.value = value;
    }

    return res.status(201).json(
      await updateHealthRecordByIdService({
        userId: id,
        recordId,
        data,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const deleteHealthRecordByIdController = async (req, res, next) => {
  try {
    const id = req.user.id;

    const recordId = Number(req.params.id);

    return res
      .status(200)
      .json(await deleteHealthRecordByIdService(id, recordId));
  } catch (error) {
    next(error);
  }
};
