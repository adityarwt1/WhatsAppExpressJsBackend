/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
//dependeciest
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import signroute from "./routes/signin.route.js";
import chatRoute from "./routes/chat.route.js";
import readRout from "./routes/read.route.js";
// setup the applicatin run
config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/signin", signroute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/read", readRout);
app.use("/api/v1/getCurrentChat" )

app.listen(port);
