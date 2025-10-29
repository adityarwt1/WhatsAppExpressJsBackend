import { io } from "../index.js";
import { connectDb } from "../lib/mongodb.js";
import User from "../models/User.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function upadteTimeSpam(req, res) {
  try {
    const chatId = req.query.chatId;
    const active = req.query.active;
    const uid = req.query.uid;

    if (!chatId) {
      return res
        .status(400)
        .json({ error: "chatid not provided in the searcparams" });
    }

    if (Boolean(active) === false) {
      io.to(chatId).emit("lastOnline", {
        lastOnline: new Date().getTime(),
        uid,
      });
      await connectDb();

      await User.findOneAndUpdate(
        { uid },
        { lastOnline: new Date().getTime() }
      );
      //sending and updateing both
      return res.status(200).json({ message: "User lastonline update" });
    }
    io.to(chatId).emit("lastOnline", {
      uid,
      lastOnline: "Online",
    });
    return res.status(200).json({ lastOnline: "Online" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: error.message });
  }
}
