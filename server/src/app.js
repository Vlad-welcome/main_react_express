import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

import initDB from "./config/initDB.js";

import authRouter from "./routes/authRouter.js";
import fruitRouter from "./routes/fruitRouter.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("./uploads", express.static("uploads"));
app.use(cors());

app.use(errorHandler);

app.use("/api/auth", authRouter);
app.use("/api/fruit", fruitRouter);

await initDB();

export default app;

//heroku
