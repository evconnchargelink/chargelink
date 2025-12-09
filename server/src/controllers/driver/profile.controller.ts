import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler.js";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Profile fetched successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const editProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Profile edited successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
