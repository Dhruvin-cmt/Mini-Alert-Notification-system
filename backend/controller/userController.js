import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { jwtToken } from "../utils/jwtToken.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose";

export const userRegister = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return next(new ErrorHandler("Provide all deatils!", 400));
  }

  const isExist = await User.findOne({ email: email.toLowerCase().trim() });
  if (isExist) {
    return next(new ErrorHandler("User with same email already exists!", 400));
  }

  const registerUser = await User.create({
    userName,
    email: email.toLowerCase().trim(),
    password,
  });

  jwtToken(registerUser, "User registered Succesfully!", 200, res);
});

export const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Provide required details", 400));
  }

  const isReg = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");
  if (!isReg) {
    return next(new ErrorHandler("User did not found!", 400));
  }

  const isPassMatch = await isReg.comparePassword(password);
  if (!isPassMatch) {
    return next(new ErrorHandler("Wrong Password!", 400));
  }

  jwtToken(isReg, "user login succesfully!", 200, res);
});
