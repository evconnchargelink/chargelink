import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { CarModel } from "../../models/car.model";
import { uploadFileToS3 } from "../../utils/storage.util";

export const getCars = asyncHandler(async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find({ driverId: req.driver?._id });

    res.status(200).json({
      message: "Cars fetched successfully",
      cars,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});

export const addCar = asyncHandler(async (req: Request, res: Response) => {
  const { name, estimatedTime, power } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const {url} = await uploadFileToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const newCar = new CarModel({
      driverId: req.driver?._id,
      name,
      thumbnail: url,
      estimatedTime,
      power,
    });

    await newCar.save();

    res.status(200).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
