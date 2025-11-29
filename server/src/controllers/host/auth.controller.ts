import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";
import { HostModel } from "../../models/host.model";
import { generateAccessAndRefreshTokens } from "../../utils/generateAccessRefreshToken";
import { AUTH_ROLES } from "../../types/role.type";



// Signup Controller
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const phone: string = req.body.number;

  // Input validation
  if (!name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Name, Email and Password are required." });
  }

  try {
    // Check if host with the same email already exists
    const existingHost = await HostModel.findOne({ email });
    if (existingHost) {
      return res
        .status(409)
        .json({ message: "Host with this email already exists." });
    }

    const host = new HostModel({
      name,
      email,
      password: password,
      number: phone,
    });

    await host.save();

    // Generate JWT token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      AUTH_ROLES.HOST,
      host._id,
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
        hostId: host._id,
      });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while saving the host." });
  }
});
