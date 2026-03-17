import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";

config({ path: "./config/.env" });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
