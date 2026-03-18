import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Alert } from "../models/alertSchema.js";

import ErrorHandler from "../middlewares/error.js";

export const getAllAlerts = catchAsyncError(async (req, res, next) => {
  const allAlerts = await Alert.find({}).limit(20);

  if (allAlerts.length <= 0) {
    return next(new ErrorHandler("No messages Yet!", 400));
  }

  // allAlerts.map((alert) => {
  //   const formatted = dayjs(alert.createdAt).format("DD MM, YYYY h:mm A");
  //   console.log(formatted);
  //   return formatted;
  // });

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
  console.log(getMsgToDelete);

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
