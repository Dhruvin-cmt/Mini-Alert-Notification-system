import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import alertRouter from "./router/alertRouter.js";
import userRouter from "./router/userRouter.js";

config({ path: "./config/.env" });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", alertRouter);
app.use("/api/v1/user", userRouter);

export default app;
