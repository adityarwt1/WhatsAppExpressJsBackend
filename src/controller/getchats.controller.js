import { connectDb } from "../lib/mongodb.js";
import Chat from "../models/Chats.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getChats(req, res) {
  try {
    const uid = req.query.uid;

    if (!uid) {
      return res.status(400).json({ error: "uid not found" });
    }

    await connectDb();

    const chats = await Chat.find({
      $or: [{ uid1: uid }, { uid2: uid }],
    });

    return res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
