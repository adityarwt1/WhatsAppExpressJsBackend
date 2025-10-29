/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
import { Router } from "express";
import { connectDb } from "../lib/mongodb.js";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, photoURL, fullName, uid } = req.body;

    //validating data
    if (!email || !photoURL || !fullName || !uid) {
      return res.json({ error: "Fields must be required" }).status(400);
    }

    //saving inforamtion
    await connectDb();
    const doc = new User({
      email,
      photoURL,
      fullName,
      uid,
    });
    await doc.save();

    // if failed to create user
    if (!doc) {
      return res.json({ error: "Failed to create user" }).status(500);
    }
    const token = jsonwebtoken.sign({ _id: doc?._id }, process.env.JWT_SECRET);

    res.cookie("whatsapp", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .json({
        success: true,
        message: "User created successfully!",
        token,
        uid,
      })
      .status(201);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message }).status(500);
  }
});

export default router;
