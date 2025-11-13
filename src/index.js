/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

// dependencies
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import signupRoute from "./routes/chat.route.js";
import chatRoute from "./routes/chat.route.js";
import readRoute from "./routes/read.route.js";
import currentChat from "./routes/currentchat.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import profileRoute from "./routes/profile.route.js";

import { Server } from "socket.io";
import http from "node:http";

import Message from "./models/Message.js";
import User from "./models/User.js";
import { connectDb } from "./lib/mongodb.js";

config();
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/signin");
app.use("/api/v1/signup", signupRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/read", readRoute);
app.use("/api/v1/getCurrentChat", currentChat);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/sendMessage", messageRoute);
app.use("/api/v1/profile", profileRoute);

// http + socket server
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// SOCKET.IO
io.on("connection", async (socket) => {
  console.log("user connected:", socket.id);

  // read handshake values
  const { chatId, userId, uid } = socket.handshake.query;

  // join chat room if provided
  if (chatId) {
    socket.join(chatId);
    console.log(`Joined room → ${chatId}`);
  }

  if (uid) {
    socket.join(uid); // for private events
    console.log(`Joined personal room → ${uid}`);
  }

  // --------------------------
  // SEND MESSAGE
  // --------------------------
  socket.on("sendMessage", async (data) => {
    try {
      const { chatId, message, uid, image, imageText } = data;

      if (!chatId || !uid) {
        return socket.emit("messageSendResponse", { sent: false });
      }

      await connectDb();

      let msgData;

      if (message) {
        msgData = new Message({ uid, chatId, message });
      } else {
        msgData = new Message({ uid, chatId, image, imageText });
      }

      await msgData.save();

      io.to(chatId).emit("messageSendResponse", {
        sent: true,
        message: msgData,
        uid,
        sendAt: Date.now(),
      });
    } catch (error) {
      console.log("Message error:", error);
      socket.emit("messageSendResponse", { sent: false });
    }
  });

  // --------------------------
  // PROFILE UPDATE
  // --------------------------
  socket.on("profileChange", async (data) => {
    try {
      const uid = socket.handshake.query.uid;
      socket.join(uid);

      const { dp, bio, name } = data;

      await connectDb();

      if (dp) {
        await User.findOneAndUpdate({ uid }, { photoURL: dp });
      } else if (bio) {
        await User.findOneAndUpdate({ uid }, { about: bio });
      } else if (name) {
        await User.findOneAndUpdate({ uid }, { fullName: name });
      } else {
        return socket.emit("profileUpdateResult", {
          error: "No valid field provided",
          update: false,
        });
      }

      io.to(uid).emit("profileUpdateResult", { update: true });
    } catch (error) {
      socket.emit("profileUpdateResult", { update: false });
    }
  });

  // --------------------------
  // LAST ONLINE UPDATE
  // --------------------------
  socket.on("lastOnline", async (data) => {
    try {
      const uid = socket.handshake.query.uid;
      const { lastOnline } = data;

      socket.join(uid);
      await connectDb();

      await User.findOneAndUpdate({ uid }, { lastOnline });
      io.to(uid).emit("lastOnlineResult", { update: true });
    } catch (error) {
      io.to(uid).emit("lastOnlineResult", { update: false });
    }
  });
});

// START SERVER
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
