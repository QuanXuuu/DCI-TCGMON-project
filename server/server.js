import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js";
import "./src/database/db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use("/*", (req, res) =>
	res.sendFile(__dirname + "../client/dist/index.html")
);

app.listen(port, () => console.log("Server is running on port: " + port));
