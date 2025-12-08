import { Document, Model, Schema, model } from "mongoose";

export interface ICar extends Document {
  _id: Schema.Types.ObjectId;
  driverId: Schema.Types.ObjectId;
  name: string;
  thumbnail: string;
  estimatedTime: number;
  power: number;
}

// Schema for the user database
const carSchema: Schema<ICar> = new Schema<ICar>({
  driverId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },

  power: {
    type: Number,
    required: true,
  },
} as const);

// Model for the User
export const CarModel: Model<ICar> = model<ICar>("car", carSchema);
