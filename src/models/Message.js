import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId(),
  },
  message: {
    type: String,
    required: true,
  },
  sendAt: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
  },
});

MessageSchema.index({ chatId: 1, _id: 1 });

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
