import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";

export const getNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "Notifications fetched successfully",
      });
    } catch (e: any) {
      res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
);
