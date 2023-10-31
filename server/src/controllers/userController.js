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
  console.log("req body:", req.body);

  const newUser = new User({ email });
  newUser.password = newUser.encryptPassword(password);
  await newUser.save();

  res.status(201).json({
    success: true,
    message: `New user ${newUser.email} created`,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  const correct = await user.comparePassword(password, user.password);
  console.log(correct);

  if (correct) {
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    res.status(401).send({
      status: "fail",
      message: "Incorrect password",
    });
  }
});

export const getUser = catchAsync(async (req, res, next) => {
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

export const updateUser = catchAsync(async (req, res, next) => {
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

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted",
  });
});

export const deleteAllUsers = catchAsync(async (req, res, next) => {
  await User.deleteMany();
  res.status(200).json({
    success: true,
    message: "All users deleted",
  });
});
