import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    email1: {
      type: String,
      required: [true, "Email id must be required"],
    },
    email2: {
      type: String,
      required: [true, "Email id must be required"],
    },
    fullName1: {
      type: String,
      required: true,
    },
    fullName2: {
      type: String,
      required: true,
    },
    lastInteraction: {
      type: Number,
      default: "Today",
    },
    lastMessage: {
      type: String,
      default: "Start new chat!",
    },
    photoURL1: {
      type: String,
      default: "/logo.svg",
    },
    photoURL2: {
      type: String,
      default: "/logo.svg",
    },
    uid1: {
      type: String,
      required: true,
    },
    uid2: {
      type: String,
      required: true,
    },
    unread1: {
      type: Number,
      default: 0,
    },
    unread2: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ChatSchema.index({ uid1: 1, uid2: 1, email1: 1, email2: 1 });

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
