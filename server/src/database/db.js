import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.DATABASE,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to mongoDB"));
