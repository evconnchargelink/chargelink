import AppError from "../utils/appError.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/async.handler.js";
import { AdminModel } from "../models/admin.model.js";
import { Request, Response, NextFunction } from "express";
import { DriverModel } from "../models/driver.model.js";
import { AUTH_ROLES } from "../types/role.type.js";
import { HostModel } from "../models/host.model.js";

export const authMiddleware = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(async (req:Request, _:Response, next:NextFunction) => {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        throw new AppError("Unauthorized request", 401);
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      if (decodedToken?.role != requiredRole)
        throw new AppError("Unauthorized request", 401);

      if (requiredRole == AUTH_ROLES.DRIVER) {
        const driver = await DriverModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );

        if (!driver) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.driver = driver;
      } else if (requiredRole == AUTH_ROLES.ADMIN) {
        const admin = await AdminModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );
        if (!admin) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.admin = admin;
      } else if (requiredRole == AUTH_ROLES.HOST) {
        const host = await HostModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );
        if (!host) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.provider = host;
      }

      next();
    } catch (error: any) {
      throw new AppError(error?.message || "Invalid access token", 401);
    }
  });
};