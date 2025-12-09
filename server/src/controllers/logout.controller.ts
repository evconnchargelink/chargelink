import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/async.handler.js";
import { AdminModel } from "../models/admin.model.js";
import { DriverModel } from "../models/driver.model.js";
import { config } from "../env.config.js";
import { HostModel } from "../models/host.model.js";
import { AUTH_ROLES } from "../types/role.type.js";

export const handleLogout = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        (requiredRole == AUTH_ROLES.DRIVER && !req.driver) ||
        (requiredRole == AUTH_ROLES.ADMIN && !req.admin) ||
        (requiredRole == AUTH_ROLES.HOST && !req.provider)
      ) {
        next(new AppError("Unauthorized", 401));
        return;
      }

      if (requiredRole == AUTH_ROLES.DRIVER) {
        await DriverModel.findByIdAndUpdate(
          req.driver._id,
          {
            $unset: {
              refreshToken: 1,
            },
          },
          {
            new: true,
          }
        );
      } else if (requiredRole == AUTH_ROLES.ADMIN) {
        await AdminModel.findByIdAndUpdate(
          req.admin._id,
          {
            $unset: {
              refreshToken: 1,
            },
          },
          {
            new: true,
          }
        );
      } else if (requiredRole == AUTH_ROLES.HOST) {
        await HostModel.findByIdAndUpdate(
          req.provider._id,
          {
            $unset: {
              refreshToken: 1,
            },
          },
          {
            new: true,
          }
        );
      }

      const options = {
        httpOnly: true,
        secure: config.ENV === "production",
      };

      return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "Logout Successfull" });
    }
  );
};
