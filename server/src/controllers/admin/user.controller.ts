import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { StationModel } from "../../models/station.model";
import { DriverModel } from "../../models/driver.model";
import { HostModel } from "../../models/host.model";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const drivers = await DriverModel.find(
      {},
      { refreshToken: 0, password: 0, otp: 0, otpExpiry: 0 }
    );
    const hosts = await HostModel.find(
      {},
      { refreshToken: 0, password: 0, otp: 0, otpExpiry: 0 }
    );

    return res.status(200).json({
      message: "All users fetched successfully",
      drivers: drivers,
      hosts: hosts,
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
