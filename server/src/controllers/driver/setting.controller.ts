import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";

export const setting = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Settings fetched successfully" });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
