import { connectDb } from "../lib/mongodb.js";
import Chat from "../models/Chats.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function deleteUnread(req, res) {
  try {
    const { chatId, uid } = req.body;

    if (!chatId || !uid) {
      return res.status(400).json({ error: "chatId and uid required" });
    }

    await connectDb();

    const chat = await Chat.findOne({ _id: chatId }).select("uid1 uid2");

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const fieldToUpdate = chat.uid1 === uid ? "unread2" : "unread1";

    await Chat.updateOne({ _id: chatId }, { $set: { [fieldToUpdate]: 0 } });

    return res.status(200).json({ message: "Unread reset " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
