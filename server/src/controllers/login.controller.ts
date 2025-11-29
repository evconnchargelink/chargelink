import { Request, Response } from "express";
import asyncHandler from "../utils/async.handler";
import { HostModel } from "../models/host.model";
import { DriverModel } from "../models/driver.model";
import { AUTH_ROLES } from "../types/role.type";
import { generateAccessAndRefreshTokens } from "../utils/generateAccessRefreshToken";

// Login Controller
export const login = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const rememberMe: boolean = req.body.rememberMe || false;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if employee with the given email exists
    const host = await HostModel.findOne({ email });
    const driver = await DriverModel.findOne({ email });

    if (!host && !driver) {
      return res.status(404).json({ message: "User not found." });
    }

    if (host) {
      // Verify the password
      const isPasswordValid = await host.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Generate JWT token
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(
          AUTH_ROLES.HOST,
          host._id,
          rememberMe
        );

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Send cookies only over HTTPS in production
        // sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Login successful.",
          role: "host",
        });
    }

    if (driver) {
      // Verify the password
      const isPasswordValid = await driver.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Generate JWT token
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(
          AUTH_ROLES.DRIVER,
          driver._id,
          rememberMe
        );

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Send cookies only over HTTPS in production
        // sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Login successful.",
          role: "driver",
        });
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred during login." });
  }
});
