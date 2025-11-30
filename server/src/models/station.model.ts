import { Document, Model, Schema, model } from "mongoose";

export interface IStation extends Document {
  _id: Schema.Types.ObjectId;
  hostId: Schema.Types.ObjectId;
  title: string;
  description: string;
  thumbnail: string;
  location: {
    lat: number;
    lng: number;
  },
  amenities: string[], // wifi restroom food_drinks free_parking
  chargerType: string;
  power: number;
  price: number;
}

// Schema for the user database
const stationSchema: Schema<IStation> = new Schema<IStation>({
  hostId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  amenities: {
    type: [String],
    required: true,
  },
  chargerType: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
} as const);

// Model for the User
export const StationModel: Model<IStation> = model<IStation>("station", stationSchema);
