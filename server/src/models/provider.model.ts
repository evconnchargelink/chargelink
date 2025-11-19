import { Document, Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { config } from "../env.config";
import { AUTH_ROLES } from "../types/role.type";

dotenv.config();

export interface IProvider extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  otp: number;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(rememberMe: boolean): string;
}

// Schema for the provider database
const providerSchema: Schema<IProvider> = new Schema<IProvider>({
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

providerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error: any) {
    next(error);
  }
});

providerSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// schema method to generate a access token
providerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: AUTH_ROLES.PROVIDER,
    },
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};

// schema method to generate a refresh token
providerSchema.methods.generateRefreshToken = function (rememberMe: boolean) {
  return jwt.sign(
    {
      _id: this._id,
      role: AUTH_ROLES.PROVIDER,
    },
    config.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: rememberMe ? "20d" : "7d",
    }
  );
};

// Model for the provider
export const ProviderModel: Model<IProvider> = model<IProvider>("provider", providerSchema);
