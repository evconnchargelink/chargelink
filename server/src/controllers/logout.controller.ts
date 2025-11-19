import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import asyncHandler from "../utils/async.handler";
import { AdminModel } from "../models/admin.model";
import { UserModel } from "../models/user.model";
import { config } from "../env.config";
import { ProviderModel } from "../models/provider.model";
import { AUTH_ROLES } from "../types/role.type";

export const handleLogout = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        (requiredRole == AUTH_ROLES.USER && !req.user) ||
        (requiredRole == AUTH_ROLES.ADMIN && !req.admin) ||
        (requiredRole == AUTH_ROLES.PROVIDER && !req.provider)
      ) {
        next(new AppError("Unauthorized", 401));
        return;
      }

      if (requiredRole == AUTH_ROLES.USER) {
        await UserModel.findByIdAndUpdate(
          req.user._id,
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
      } else if (requiredRole == AUTH_ROLES.PROVIDER) {
        await ProviderModel.findByIdAndUpdate(
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
