import { Document, Model, Schema, model } from "mongoose";

export interface INotification extends Document {
  _id: Schema.Types.ObjectId;
  reference: {
    type: "driver" | "host" | "admin";
    id: Schema.Types.ObjectId;
  };
  createdAt: Date;
}

// Schema for the notification database
const notificationSchema: Schema<INotification> = new Schema<INotification>({
  reference: {
    type: {
      type: String,
      enum: ["driver", "host", "admin"],
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      refPath: "reference.type",
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
} as const);

// Model for the User
export const NotificationModel: Model<INotification> = model<INotification>(
  "notification",
  notificationSchema
);
