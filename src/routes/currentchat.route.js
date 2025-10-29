import { Router } from "express";
import { getCurrentChat } from "../controller/getCurretchat.controller";

const router = Router();

router.route("/").get(getCurrentChat);

export default router;
