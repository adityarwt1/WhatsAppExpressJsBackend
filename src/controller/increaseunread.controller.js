import { connectDb } from "../lib/mongodb.js";
import Chat from "../models/Chats.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function incrementUnread(req, res) {
  try {
    const { chatId, senderUid } = req.body;

    if (!chatId || !senderUid) {
      return res.status(400).json({ error: "chatId & senderUid required" });
    }

    await connectDb();

    const chat = await Chat.findOne({ _id: chatId }).select("uid1 uid2");

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    let fieldToUpdate;

    if (chat.uid1 === senderUid) {
      fieldToUpdate = "unread2"; // ✅ increase unread for opposite user
    } else if (chat.uid2 === senderUid) {
      fieldToUpdate = "unread1";
    } else {
      return res.status(403).json({ error: "Sender UID not part of chat" });
    }

    await Chat.updateOne({ _id: chatId }, { $inc: { [fieldToUpdate]: 1 } });

    return res.status(200).json({ message: "Unread incremented ✅" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
