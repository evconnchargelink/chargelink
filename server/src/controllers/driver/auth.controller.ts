import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler.js";
import { DriverModel } from "../../models/driver.model.js";
import { generateAccessAndRefreshTokens } from "../../utils/generateAccessRefreshToken.js";
import { AUTH_ROLES } from "../../types/role.type.js";


// Signup Controller
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const password: string = req.body.password;

  // Input validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, Email and Password are required." });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await DriverModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const user = new DriverModel({
      name,
      email,
      password: password,
    });

    await user.save();

    // Generate JWT token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      AUTH_ROLES.DRIVER,
      user._id,
      false
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
        message: "Signup successful.",
        userId: user._id,
      });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while saving the user." });
  }
});
