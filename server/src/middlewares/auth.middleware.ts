import AppError from "../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/async.handler";
import { AdminModel } from "../models/admin.model";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { AUTH_ROLES } from "../types/role.type";
import { ProviderModel } from "../models/provider.model";

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

      if (requiredRole == AUTH_ROLES.USER) {
        const user = await UserModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );

        if (!user) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.user = user;
      } else if (requiredRole == AUTH_ROLES.ADMIN) {
        const admin = await AdminModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );
        if (!admin) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.admin = admin;
      } else if (requiredRole == AUTH_ROLES.PROVIDER) {
        const provider = await ProviderModel.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );
        if (!provider) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.provider = provider;
      }

      next();
    } catch (error: any) {
      throw new AppError(error?.message || "Invalid access token", 401);
    }
  });
};