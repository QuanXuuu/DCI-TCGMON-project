import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log("Authorization token required");
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default checkAuth;
