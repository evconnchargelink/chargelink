import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler.js";

export const getDashboardData = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const hostId = req.provider.id;
    } catch (e: any) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);
