import { Router } from "express";
import { deleteUnread } from "../controller/delelete.unread.js";
import { incrementUnread } from "../controller/increaseunread.controller.js";

const router = Router();

router.route("/").delete(deleteUnread).post(incrementUnread);

export default router;
