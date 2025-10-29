import { connectDb } from "../lib/mongodb.js";
import Message from "../models/Message.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getCurrentChat(req, res) {
  try {
    const chatId = req.query.chatId;

    //validating uid
    if (!chatId) {
      return res.status(400).json({ error: "uid not founf" });
    }

    await connectDb();
    const messages = await Message.find({ chatId }).select(
      "message sendAt uid"
    );
    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
