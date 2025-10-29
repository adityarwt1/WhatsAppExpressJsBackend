import { Router } from "express";
import { addChat } from "../controller/addchat.js";

const router = Router();

router.post("/", addChat);

export default router;
