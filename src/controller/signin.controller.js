import { connectDb } from "../lib/mongodb";
import User from "../models/User";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function signinUser(req, res) {
  try {
    const body = req.body;
    const uid = body.uid;

    if (!uid) {
      return res.status(400).json({ error: "Uid not provided" });
    }

    await connectDb();

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    
    return res.status(200).json({ message: "signin controller" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
