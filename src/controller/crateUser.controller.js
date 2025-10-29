import { connectDb } from "../lib/mongodb.js";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function createUser(req, res) {
  try {
    const { email, photoURL, fullName, uid } = req.body;

    //validating data
    if (!email || !photoURL || !fullName || !uid) {
      return res.json({ error: "Fields must be required" }).status(400);
    }

    //saving inforamtion
    await connectDb();

    const user = await User.findOne({ uid });
    if (user) {
      const token = jsonwebtoken.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        }
      );

      res.cookie("whatsapp", token);

      return res.status(200).json({ message: "User loged in!" });
    } else {
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
      const token = jsonwebtoken.sign(
        { _id: doc?._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        }
      );

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
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message }).status(500);
  }
}
