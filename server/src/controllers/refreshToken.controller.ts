import { CookieOptions, NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessAndRefreshTokens } from "../utils/generateAccessRefreshToken.js";
import asyncHandler from "../utils/async.handler.js";
import { AdminModel } from "../models/admin.model.js";
import { DriverModel } from "../models/driver.model.js";
import { config } from "../env.config.js";
import { AUTH_ROLES } from "../types/role.type.js";
import { HostModel } from "../models/host.model.js";

export const handleRefreshAccessToken = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const incomingRefreshToken = req.cookies?.refreshToken;

      if (!incomingRefreshToken) {
        return next(new AppError("Unauthorized request", 401));
      }

      try {
        const decodedToken = jwt.verify(
          incomingRefreshToken,
          config.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;

        let InstanceModel: any = DriverModel;

        if (decodedToken?.role == AUTH_ROLES.ADMIN) InstanceModel = AdminModel;

        if (decodedToken?.role == AUTH_ROLES.HOST) InstanceModel = HostModel;

        const instance = await InstanceModel.findById(decodedToken?._id);

        if (!instance) {
          return next(new AppError("Invalid refresh token", 401));
        }

        if (incomingRefreshToken !== instance.refreshToken) {
          return next(new AppError("Refresh token is expired or used", 401));
        }

        const options: CookieOptions = {
          httpOnly: true,
          secure: config.ENV === "production",
          // sameSite: "strict",
        };

        const { accessToken, refreshToken } =
          await generateAccessAndRefreshTokens(
            requiredRole,
            instance._id,
            false
          );

        return res
          .status(200)
          .cookie("accessToken", accessToken, {
            ...options,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .cookie("refreshToken", refreshToken, {
            ...options,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .json({ message: "tokens refreshed" });
      } catch (error: any) {
        return next(
          new AppError(error?.message || "Invalid refresh token", 400)
        );
      }
    }
  );
};
