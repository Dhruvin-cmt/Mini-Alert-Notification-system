import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";

export const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.admin;
  if (!token) {
    return next(new ErrorHandler("User not authenticated!", 400));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  next();
});