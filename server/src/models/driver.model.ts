import { Document, Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../env.config.js";
import { AUTH_ROLES } from "../types/role.type.js";


export interface IDriver extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  number: string;
  isEmailVerified: boolean;
  password: string;
  otp: number;
  kyc: {
   aadharNumber: string;
   aadharFront: string;
   aadharBack: string;
   panNumber: string;
   panFront: string;
   isVerified: boolean;
  }
  settings: {
    isNotificationEnabled: boolean;
  }
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(rememberMe: boolean): string;
}

// Schema for the user database
const driverSchema: Schema<IDriver> = new Schema<IDriver>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
  },
  isEmailVerified: Boolean,
  password: {
    type: String,
    trim: true,
    required: true,
  },

  refreshToken: {
    type: String,
    trim: true,
  },
} as const);

driverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error: any) {
    next(error);
  }
});

driverSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// schema method to generate a access token
driverSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: AUTH_ROLES.DRIVER,
    },
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};

// schema method to generate a refresh token
driverSchema.methods.generateRefreshToken = function (rememberMe: boolean) {
  return jwt.sign(
    {
      _id: this._id,
      role: AUTH_ROLES.DRIVER,
    },
    config.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: rememberMe ? "20d" : "7d",
    }
  );
};

// Model for the User
export const DriverModel: Model<IDriver> = model<IDriver>("driver", driverSchema);
