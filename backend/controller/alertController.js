import axios from "axios";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Alert } from "../models/alertSchema.js";
import { now } from "mongoose";
import ErrorHandler from "../middlewares/error.js";

export const getAllAlerts = catchAsyncError(async (req, res, next) => {
  const allAlerts = await Alert.find({}).limit(20);

  res.status(200).json({
    success: true,
    message: "All alerts fetch succesfully!",
    data: allAlerts,
  });
});

export const markAsRead = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const getUnreadMsg = await Alert.findById(id);
  if (!getUnreadMsg) {
    return next(new ErrorHandler("Message not found!", 400));
  }

  let getMsgAndUpdate = await Alert.findByIdAndUpdate(
    id,
    { isRead: req.body.isRead },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
});
