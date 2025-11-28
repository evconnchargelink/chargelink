import { Document, Model, Schema, model } from "mongoose";

export interface IBooking extends Document {
  _id: Schema.Types.ObjectId;
  driverId: Schema.Types.ObjectId;
  stationId: Schema.Types.ObjectId;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  payment: number;
  bookedAt: Date;
}

// Schema for the booking database
const bookingSchema: Schema<IBooking> = new Schema<IBooking>({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "driver",
    required: true,
  },
  stationId: {
    type: Schema.Types.ObjectId,
    ref: "station",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  payment: {
    type: Number,
    default: 0,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
} as const);

// Model for the User
export const BookingModel: Model<IBooking> = model<IBooking>(
  "booking",
  bookingSchema
);
