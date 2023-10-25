import User from "./../models/UserModel.js";
import catchAsync from "./../utils/catchAsync.js";

export const signup = catchAsync(async (req, res, next) => {
  const newUser = User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
