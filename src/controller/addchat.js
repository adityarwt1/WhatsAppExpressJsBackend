/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

import { connectDb } from "../lib/mongodb.js";
import Chat from "../models/Chats.js";
import jsonwbtoken from "jsonwebtoken";
import User from "../models/User.js";

export const addChat = async function (req, res) {
  try {
    //getting data
    const { uid, email, fullName, photoURL } = req.body;

    if (!uid || !email || !fullName || !photoURL) {
      return res.json({ error: "Fields are required" }).status(400);
    }

    const token = req.cookies.whatsapp;

    if (!token) {
      return res.json({ error: "token not found" }).status(401);
    }

    // decoding for the uid and get the current user vaklue

    const decode = jsonwbtoken.verify(token, process.env.JWT_SECRET);

    if (!decode._id) {
      return res.json({ error: "Invalid token" }).status(401);
    }

    //finding current userdata
    await connectDb();
    const currentUser = await User.findOne({ _id: decode._id });

    // if currentuser data not found
    if (!currentUser) {
      return res.json({ error: "Current User not found" }).status(404);
    }

    const chat = new Chat({
      email1: currentUser.email,
      email2: email,
      uid1: currentUser.uid,
      uid2: uid,
      photoURL1: currentUser.photoURL,
      photoURL2: photoURL,
      fullName1: currentUser.fullName,
      fullName2: fullName,
    });
    await chat.save();

    if (chat) {
      return res
        .json({
          success: true,
          chat: {
            email,
            uid,
            photoURL,
            fullName,
          },
        })
        .status(201);
    } else {
      return res.json({ error: "Failed to setup the chat" }).status(500);
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message }).status(500);
  }
};
