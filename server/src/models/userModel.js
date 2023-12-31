import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import validator from "validator";
dotenv.config();

const secret = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    joined: {
      type: String,
      default: new Date().toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    },
    collections: { type: Array, default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  }
);

userSchema.methods.encryptPassword = (password) => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");
  return hash;
};

userSchema.methods.comparePassword = function (loginPassword) {
  if (this.password !== this.encryptPassword(loginPassword)) {
    return false;
  }
  return true;
};

const User = new mongoose.model("User", userSchema, "users");

export default User;
