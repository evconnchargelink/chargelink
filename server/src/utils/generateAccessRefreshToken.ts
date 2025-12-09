import {Schema} from "mongoose";
import AppError from "./appError.js";
import { AdminModel } from "../models/admin.model.js";
import { DriverModel } from "../models/driver.model.js";
import { AUTH_ROLES } from "../types/role.type.js";
import { HostModel } from "../models/host.model.js";

export const generateAccessAndRefreshTokens = async (
  requiredRole: AUTH_ROLES,
  instanceId: Schema.Types.ObjectId,
  rememberMe: boolean
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const instance =
      requiredRole == AUTH_ROLES.ADMIN
        ? await AdminModel.findById(instanceId)
        : requiredRole == AUTH_ROLES.DRIVER
        ? await DriverModel.findById(instanceId)
        : await HostModel.findById(instanceId);

    if (!instance) {
      throw new AppError(`${requiredRole} not found`, 404);
    }

    const accessToken = instance.generateAccessToken();
    const refreshToken = instance.generateRefreshToken(rememberMe);

    instance.refreshToken = refreshToken;
    await instance.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new AppError(
      "Something went wrong while generating refresh and access token",
      500
    );
  }
};