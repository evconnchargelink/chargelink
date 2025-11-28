import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Bookings fetched successfully",
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
});
