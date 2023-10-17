import express from "express";
import cors from "cors";
import userRouter from "./src/routes/users.js";
import "./src/database/db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/", express.static(path.join(__dirname, "/dist")));
app.use("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.listen(port, () => console.log("Server is running on port: " + port));
