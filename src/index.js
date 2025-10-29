/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
//dependeciest
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import signupRoute from "./routes/chat.route.js";
import chatRoute from "./routes/chat.route.js";
import readRout from "./routes/read.route.js";
import currentChat from "./routes/currentchat.route.js";
import userRoute from "./routes/user.route.js";
import { Server } from "socket.io";
import http from "node:http";
// setup the applicatin run
config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/signin");
app.use("/api/v1/signup", signupRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/read", readRout);
app.use("/api/v1/getCurrentChat", currentChat);
app.use("/api/v1/user", userRoute);

/// socket io connection
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

///
app.listen(port);
