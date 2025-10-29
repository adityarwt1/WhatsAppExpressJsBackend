import { connectDb } from "../lib/mongodb.js";
import User from "../models/User.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function userinfo(req, res) {
  try {
    const uid = req.query.uid;

    if (!uid) {
      return res
        .status(400)
        .json({ error: "uid must be provide in the prameter as uid" });
    }

    await connectDb();
    const user = await User.finOne({ uid });

    if (!user) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
