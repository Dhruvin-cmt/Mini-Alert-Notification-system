import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Alert } from "../models/alertSchema.js";

import ErrorHandler from "../middlewares/error.js";

export const getAllAlerts = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalAlerts = await Alert.countDocuments();
  const allAlerts = await Alert.find({})
    .sort({ createdAt: -1 }) 
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    success: true,
    message: "Alerts fetched successfully!",
    data: allAlerts,
    pagination: {
      totalAlerts,
      totalPages: Math.ceil(totalAlerts / limit),
      currentPage: page,
      limit,
    },
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

  res.status(200).json({
    success: true,
    message: "Message mark as read!",
    getMsgAndUpdate,
  });
});

export const markAllAsRead = catchAsyncError(async (req, res, next) => {
  const getAllUnreads = await Alert.updateMany(
    {
      isRead: false,
    },
    { $set: { isRead: true } }
  );

  res.status(200).json({
    success: true,
    message: "All messages mark as read",
    getAllUnreads,
  });
});

export const deleteMsg = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const getMsgToDelete = await Alert.findById(id);

  if (!getMsgToDelete) {
    return next(new ErrorHandler("Message did not found!", 400));
  }

  await getMsgToDelete.deleteOne();

  res.status(200).json({
    success: true,
    message: "alert deleted succesfully!",
    getMsgToDelete,
  });
});
