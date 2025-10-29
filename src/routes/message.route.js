import { Router } from "express";
import { sendMessage } from "../controller/senmessage.controller.js";

const router = Router();

export default router.route("/").post(sendMessage);
