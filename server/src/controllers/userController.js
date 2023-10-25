import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const newUser = new User({ email });
  newUser.password = newUser.encryptPassword(password);

  await newUser.save();

  const token = signToken(newUser._id);

  res.status(201).json({
    success: true,
    token,
    message: `New user ${newUser.email} created`,
    data: { user: newUser },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1, Check if email and password exist

  // 2, Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  const correct = await user.comparePassword(password, user.password);
  console.log(correct);

  if (!correct) {
    return next("Incorrect password, please double check");
  }

  // 3, If everything okay, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

export const getUser = catchAsync(async (req, res) => {
  const response = await User.findOne({ email: req.params.id });
  res.status(200).json(response);
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const response = await User.find();
  res.status(200).json({
    success: true,
    results: response.length,
    data: { response },
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const response = await User.findOne({ email: req.params.id });
  const { collections } = req.body;
  response.collections = collections;
  await response.save();

  res.status(200).json({
    success: true,
    message: "User data successfully updated",
    data: response,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted",
  });
});

export const deleteAllUsers = catchAsync(async (req, res) => {
  await User.deleteMany();
  res.status(200).json({
    success: true,
    message: "All users deleted",
  });
});
