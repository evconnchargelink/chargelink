import { AdminModel } from "../models/admin.model";
import { DriverModel } from "../models/driver.model";
import { HostModel } from "../models/host.model";
import { AUTH_ROLES } from "../types/role.type";
import asyncHandler from "../utils/async.handler";
import { Request, Response } from "express";
import AppError from "../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getIdentity = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new AppError("Unauthorized request", 401);
  }

  const decodedToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;

  const role = decodedToken?.role;
  const id = decodedToken?._id;

  try {
    if (role == AUTH_ROLES.DRIVER) {
      const driver = await DriverModel.findById(id).select(
        "-password -refreshToken -otp"
      );
      return res.status(200).json({
        name: driver?.name,
        email: driver?.email,
        role,
        _id: driver?._id,
      });
    } else if (role == AUTH_ROLES.HOST) {
      const host = await HostModel.findById(id).select(
        "-password -refreshToken -otp"
      );
      return res.status(200).json({
        name: host?.name,
        email: host?.email,
        role,
        _id: host?._id,
      });
    } else if (role == AUTH_ROLES.ADMIN) {
      const admin = await AdminModel.findById(id).select(
        "-password -refreshToken -otp"
      );
      return res.status(200).json({
        name: admin?.name,
        email: admin?.email,
        role,
        _id: admin?._id,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error?.message });
  }
});
