import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    about: {
      type: String,
      default: "Hey there! I am using WhatsApp",
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
    },
    fullName: {
      type: String,
    },
    lastOnline: {
      type: Number,
    },
    photoURL: {
      type: String,
      default: "/logo.svg",
    },
    uid: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.index({ uid: 1, _id: 1 });
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
