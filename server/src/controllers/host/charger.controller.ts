import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";

export const getChargers = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Chargers fetched successfully",
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const addCharger = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Charger added successfully",
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
