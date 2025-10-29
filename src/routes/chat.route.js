import { Router } from "express";
import { addChat } from "../controller/addchat.js";
import { getChats } from "../controller/getchats.controller.js";

const router = Router();

router.route("/").post(addChat).get(getChats);
export default router;
