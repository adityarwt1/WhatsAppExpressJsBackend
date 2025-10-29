import { connectDb } from "../lib/mongodb.js";
import User from "../models/User.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function updateProfile(req, res) {
  try {
    const { uid, fullName, photoURL, about } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    await connectDb();

    const updateFields = {};

    if (fullName) updateFields.fullName = fullName;
    if (photoURL) updateFields.photoURL = photoURL;
    if (about) updateFields.about = about;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No values provided to update" });
    }

    const user = await User.findOneAndUpdate({ uid }, updateFields, {
      new: true, // return updated user
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
