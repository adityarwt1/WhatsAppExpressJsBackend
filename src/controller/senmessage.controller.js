import { connectDb } from "../lib/mongodb.js";
import Message from "../models/Message.js";
import { io } from "../index.js";
/***
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function sendMessage(req, res) {
  try {
    // coschatId, message, uid, image, imageText;

    const body = req.body;
    const chatId = body.chatId;
    const message = body.message;
    const uid = body.uid;
    //option thing for he chat
    const image = body.image;
    const imageText = body.imageText;

    if (!chatId || !uid) {
      return res
        .status(400)
        .json({ error: "Action not taken by in absence the chatid" });
    }

    if (message) {
      await connectDb();
      const message = new Message({
        uid,
        chatId,
        message,
      });
      await message.save();

      io.to(chatId).emit("newMessage", {
        message,
        uid,
        sendAt: new Date().getTime(),
      });
      return res.status(200).json({ message: "sent successfully!" });
    } else {
      await connectDb();
      const messsage = new Message({
        uid,
        chatId,
        image,
        imageText,
      });
      await message.save();
      // eming the message
      io.to(chatId).emit("newMessage", {
        image,
        uid,
        imageText,
        sendAt: new Date().getTime(),
      });
      return res.status(200).json({ message: "message send succcesfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
