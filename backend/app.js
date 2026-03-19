import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import alertRouter from "./router/alertRouter.js";
import userRouter from "./router/userRouter.js";
import cors from "cors"

const app = express();
config({ path: "./config/.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", alertRouter);
app.use("/api/v1/user", userRouter);

export default app;
