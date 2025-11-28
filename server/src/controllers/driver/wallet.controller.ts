import asyncHandler from "../../utils/async.handler";
import { Request, Response } from "express";

export const getWalletInfo = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "Wallet info fetched successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);
