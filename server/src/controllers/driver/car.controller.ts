import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";

export const getCars = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Cars fetched successfully",
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});

export const addCar = asyncHandler(async (_req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Car added successfully",
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
