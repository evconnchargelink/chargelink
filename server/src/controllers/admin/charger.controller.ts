import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { StationModel } from "../../models/station.model";

export const getChargers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const stations = await StationModel.find({});
    return res.status(200).json({
      message: "All stations fetched successfully",
      chargers: stations,
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
