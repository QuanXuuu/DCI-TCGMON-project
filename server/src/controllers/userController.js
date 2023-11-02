import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "scccess",
    token,
    data: {
      user,
    },
  });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).send({
      status: "fail",
      message: "Invalid token, please login",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const loggedInUser = await User.findById(decoded.id);
  console.log(loggedInUser);

  next();
});

export const createUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const newUser = new User({ email });
  newUser.password = newUser.encryptPassword(password);
  await newUser.save();

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  const correct = await user.comparePassword(password, user.password);

  if (correct) {
    createSendToken(user, 200, res);
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
