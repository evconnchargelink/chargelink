import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { StationModel } from "../../models/station.model";
import { uploadFileToS3 } from "../../utils/storage.util";

export const getChargers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const chargers = await StationModel.find({ hostId: req.provider.id });
    if (!chargers) {
      return res.status(404).json({
        message: "No chargers found",
        chargers: [],
      });
    }

    res.status(200).json({
      message: "Chargers fetched successfully",
      chargers,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const addCharger = asyncHandler(async (req: Request, res: Response) => {
  const hostId = req.provider.id;

  const { title, location, type, power, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!title || !location || !type || !power || !price) {
    return res.status(400).json({
      message: "Title, location, type, power, amenities and price are required",
    });
  }

  try {
    const thumbnail = await uploadFileToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const charger = new StationModel({
      title,
      description: "",
      location: {
        lat: JSON.parse(location).lat,
        lng: JSON.parse(location).lng,
      },
      chargerType: type,
      power,
      price,
      hostId,
      thumbnail: thumbnail.url,
    });

    await charger.save();

    res.status(200).json({
      message: "Charger added successfully",
      charger,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
