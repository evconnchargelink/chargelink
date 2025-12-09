import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { StationModel } from "../../models/station.model";

export const nearestChargers = asyncHandler(
  async (_req: Request, res: Response) => {
    try {
      const chargers = await StationModel.find({});

      res.status(200).json({
        message: "Nearest Chargers",
        chargers,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);


export const getSingleCharger = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
      const charger = await StationModel.findById(id);

      if (!charger) {
        return res.status(404).json({
          message: "Charger not found",
        });
      }

      res.status(200).json({
        message: "Charger found",
        charger,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);
