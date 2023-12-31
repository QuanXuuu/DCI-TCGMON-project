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
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400).json({
      success: false,
      message: "Email already in use, please use another one",
    });
  } else {
    const newUser = new User({ email });
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    createSendToken(newUser, 201, res);
  }
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields must be filled",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  const correct = await user.comparePassword(password, user.password);

  if (correct) {
    createSendToken(user, 200, res);
    console.log(`${user.email} successfully logged in.`);
  } else {
    res.status(401).json({
      status: "fail",
      message: "Wrong email and/or password, please double check",
    });
  }
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
  console.log("User logged out.");
});

export const getUser = catchAsync(async (req, res) => {
  const response = await User.findOne({ email: req.params.id });

  res.status(200).json(response);
});

export const getAllUsers = catchAsync(async (req, res) => {
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
