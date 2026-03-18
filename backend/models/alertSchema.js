import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  alertType: {
    type: String,
    enum: ["info", "warning", "error"],
    default: "info",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

export const Alert = mongoose.model("Alert", alertSchema);
